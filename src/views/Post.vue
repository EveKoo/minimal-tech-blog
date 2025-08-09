<template>
  <div class="post-page">
    <div v-if="post" class="post-container">
      <header class="post-header">
        <div class="post-meta">
          <span class="post-date">{{ formatDate(post.publishedAt) }}</span>
          <span class="post-read-time">{{ post.readTime }} 分钟阅读</span>
        </div>
        
        <h1 class="post-title">{{ post.title }}</h1>
        
        <div class="post-tags">
          <span 
            v-for="tag in post.tags" 
            :key="tag"
            class="post-tag"
            @click="filterByTag(tag)"
          >
            {{ tag }}
          </span>
        </div>
      </header>

      <main class="post-content">
        <MarkdownRenderer :content="post.content" />
      </main>

      <footer class="post-footer">
        <div class="post-navigation">
          <button 
            v-if="previousPost"
            class="nav-btn prev"
            @click="goToPost(previousPost)"
          >
            <span class="nav-arrow">←</span>
            <div class="nav-info">
              <span class="nav-label">上一篇</span>
              <span class="nav-title">{{ previousPost.title }}</span>
            </div>
          </button>
          
          <button 
            v-if="nextPost"
            class="nav-btn next"
            @click="goToPost(nextPost)"
          >
            <div class="nav-info">
              <span class="nav-label">下一篇</span>
              <span class="nav-title">{{ nextPost.title }}</span>
            </div>
            <span class="nav-arrow">→</span>
          </button>
        </div>

        <div class="related-posts">
          <h3 class="related-title">相关文章</h3>
          <div class="related-grid">
            <article 
              v-for="relatedPost in relatedPosts" 
              :key="relatedPost.id"
              class="related-card"
              @click="goToPost(relatedPost)"
            >
              <h4 class="related-post-title">{{ relatedPost.title }}</h4>
              <p class="related-post-excerpt">{{ relatedPost.excerpt }}</p>
              <div class="related-post-meta">
                <span class="related-post-date">{{ formatDate(relatedPost.publishedAt) }}</span>
                <span class="related-post-read-time">{{ relatedPost.readTime }} 分钟</span>
              </div>
            </article>
          </div>
        </div>
      </footer>
    </div>

    <div v-else class="post-not-found">
      <h2>文章未找到</h2>
      <p>抱歉，您访问的文章不存在。</p>
      <router-link to="/" class="back-home">返回首页</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import MarkdownRenderer from '../components/MarkdownRenderer.vue'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

const post = computed(() => {
  return blogStore.getPostBySlug(route.params.slug)
})

const posts = computed(() => blogStore.sortedPosts)
const currentIndex = computed(() => {
  return posts.value.findIndex(p => p.slug === route.params.slug)
})

const previousPost = computed(() => {
  if (currentIndex.value > 0) {
    return posts.value[currentIndex.value - 1]
  }
  return null
})

const nextPost = computed(() => {
  if (currentIndex.value < posts.value.length - 1) {
    return posts.value[currentIndex.value + 1]
  }
  return null
})

const relatedPosts = computed(() => {
  if (!post.value) return []
  
  const currentTags = post.value.tags
  const related = posts.value
    .filter(p => p.id !== post.value.id)
    .filter(p => p.tags.some(tag => currentTags.includes(tag)))
    .slice(0, 3)
  
  return related
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const goToPost = (post) => {
  router.push(`/post/${post.slug}`)
}

const filterByTag = (tag) => {
  router.push(`/?tag=${tag}`)
}

// 更新页面标题
onMounted(() => {
  if (post.value) {
    document.title = `${post.value.title} - 极简技术博客`
  }
})
</script>

<style scoped>
.post-page {
  min-height: 100vh;
  background: #fafafa;
}

.dark-theme .post-page {
  background: #1a1a1a;
}

.post-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.post-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e1e5e9;
}

.dark-theme .post-header {
  border-bottom-color: #404040;
}

.post-meta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.dark-theme .post-meta {
  color: #999;
}

.post-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  line-height: 1.2;
}

.dark-theme .post-title {
  color: #e1e5e9;
}

.post-tags {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.post-tag {
  background: #f1f3f4;
  color: #666;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.post-tag:hover {
  background: #42b883;
  color: white;
}

.dark-theme .post-tag {
  background: #404040;
  color: #ccc;
}

.post-content {
  margin-bottom: 4rem;
}

.post-footer {
  border-top: 1px solid #e1e5e9;
  padding-top: 3rem;
}

.dark-theme .post-footer {
  border-top-color: #404040;
}

.post-navigation {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  gap: 1rem;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  max-width: 45%;
}

.nav-btn:hover {
  border-color: #42b883;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dark-theme .nav-btn {
  background: #2c2c2c;
  border-color: #404040;
}

.dark-theme .nav-btn:hover {
  border-color: #42b883;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.nav-btn.prev {
  text-align: left;
}

.nav-btn.next {
  text-align: right;
  flex-direction: row-reverse;
}

.nav-arrow {
  font-size: 1.5rem;
  color: #42b883;
  font-weight: bold;
}

.nav-info {
  display: flex;
  flex-direction: column;
}

.nav-label {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.dark-theme .nav-label {
  color: #999;
}

.nav-title {
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.3;
}

.dark-theme .nav-title {
  color: #e1e5e9;
}

.related-posts {
  margin-top: 3rem;
}

.related-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.dark-theme .related-title {
  color: #e1e5e9;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.related-card {
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.related-card:hover {
  border-color: #42b883;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dark-theme .related-card {
  background: #2c2c2c;
  border-color: #404040;
}

.dark-theme .related-card:hover {
  border-color: #42b883;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.related-post-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  line-height: 1.3;
}

.dark-theme .related-post-title {
  color: #e1e5e9;
}

.related-post-excerpt {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.dark-theme .related-post-excerpt {
  color: #ccc;
}

.related-post-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: #999;
}

.post-not-found {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.dark-theme .post-not-found {
  color: #ccc;
}

.post-not-found h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.dark-theme .post-not-found h2 {
  color: #e1e5e9;
}

.back-home {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.back-home:hover {
  background: #3aa876;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .post-container {
    padding: 1rem;
  }
  
  .post-title {
    font-size: 2rem;
  }
  
  .post-navigation {
    flex-direction: column;
  }
  
  .nav-btn {
    max-width: 100%;
  }
  
  .related-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .post-title {
    font-size: 1.75rem;
  }
  
  .post-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .nav-btn {
    padding: 0.75rem;
  }
  
  .nav-title {
    font-size: 0.9rem;
  }
}
</style> 