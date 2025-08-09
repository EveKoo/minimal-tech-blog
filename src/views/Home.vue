<template>
  <div class="home">
    <header class="hero">
      <div class="hero-content">
        <h1 class="hero-title">极简技术博客</h1>
        <p class="hero-subtitle">分享前端技术，记录学习心得</p>
        <div class="hero-stats">
          <span class="stat">{{ posts.length }} 篇文章</span>
          <span class="stat">{{ tags.length }} 个标签</span>
        </div>
      </div>
    </header>

    <main class="main-content">
      <section class="posts-section">
        <div class="section-header">
          <h2 class="section-title">最新文章</h2>
          <div class="section-actions">
            <router-link to="/admin/new" class="create-post-btn">
              <span>✏️</span> 写文章
            </router-link>
            <div class="tags-filter">
            <span class="filter-label">标签筛选:</span>
            <div class="tags-list">
              <button 
                class="tag-btn"
                :class="{ active: selectedTag === null }"
                @click="selectedTag = null"
              >
                全部
              </button>
              <button 
                v-for="tag in tags" 
                :key="tag"
                class="tag-btn"
                :class="{ active: selectedTag === tag }"
                @click="selectedTag = tag"
              >
                {{ tag }}
              </button>
            </div>
          </div>
        </div>
      </div>

        <div class="posts-grid">
          <article 
            v-for="post in filteredPosts" 
            :key="post.id"
            class="post-card"
            @click="viewPost(post)"
          >
            <div class="post-header">
              <h3 class="post-title">{{ post.title }}</h3>
              <div class="post-meta">
                <span class="post-date">{{ formatDate(post.publishedAt) }}</span>
                <span class="post-read-time">{{ post.readTime }} 分钟阅读</span>
              </div>
            </div>
            
            <p class="post-excerpt">{{ post.excerpt }}</p>
            
            <div class="post-tags">
              <span 
                v-for="tag in post.tags" 
                :key="tag"
                class="post-tag"
              >
                {{ tag }}
              </span>
            </div>
          </article>
        </div>

        <div v-if="filteredPosts.length === 0" class="no-posts">
          <p>暂无相关文章</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'

const router = useRouter()
const blogStore = useBlogStore()

const selectedTag = ref(null)

const posts = computed(() => blogStore.sortedPosts)
const tags = computed(() => blogStore.tags)

const filteredPosts = computed(() => {
  if (!selectedTag.value) {
    return posts.value
  }
  return blogStore.getPostsByTag(selectedTag.value)
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const viewPost = (post) => {
  router.push(`/post/${post.slug}`)
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -1px;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.stat {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.create-post-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.create-post-btn:hover {
  background: #3aa876;
  transform: translateY(-1px);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.dark-theme .section-title {
  color: #e1e5e9;
}

.tags-filter {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-label {
  font-weight: 500;
  color: #666;
}

.dark-theme .filter-label {
  color: #ccc;
}

.tags-list {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag-btn {
  background: none;
  border: 1px solid #e1e5e9;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  color: #666;
}

.tag-btn:hover {
  border-color: #42b883;
  color: #42b883;
}

.tag-btn.active {
  background: #42b883;
  border-color: #42b883;
  color: white;
}

.dark-theme .tag-btn {
  border-color: #404040;
  color: #ccc;
}

.dark-theme .tag-btn:hover {
  border-color: #42b883;
  color: #42b883;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.post-card {
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.post-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #42b883, #667eea);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: #42b883;
}

.post-card:hover::before {
  transform: scaleX(1);
}

.dark-theme .post-card {
  background: #2c2c2c;
  border-color: #404040;
}

.dark-theme .post-card:hover {
  border-color: #42b883;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.post-header {
  margin-bottom: 1rem;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  line-height: 1.3;
}

.dark-theme .post-title {
  color: #e1e5e9;
}

.post-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}

.dark-theme .post-meta {
  color: #999;
}

.post-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.dark-theme .post-excerpt {
  color: #ccc;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.post-tag {
  background: #f1f3f4;
  color: #666;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.dark-theme .post-tag {
  background: #404040;
  color: #ccc;
}

.no-posts {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.dark-theme .no-posts {
  color: #ccc;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .post-card {
    padding: 1.5rem;
  }
  
  .tags-filter {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 3rem 0;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .main-content {
    padding: 2rem 1rem;
  }
  
  .post-card {
    padding: 1rem;
  }
}
</style> 