<template>
  <div class="admin-page">
    <div class="admin-header">
      <h1>博客管理后台</h1>
      <button @click="createNewPost" class="btn btn-primary">
        <span>+</span> 创建新文章
      </button>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">{{ publishedCount }}</div>
        <div class="stat-label">已发布文章</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ draftCount }}</div>
        <div class="stat-label">草稿文章</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ totalViews }}</div>
        <div class="stat-label">总浏览量</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ totalTags }}</div>
        <div class="stat-label">标签数量</div>
      </div>
    </div>

    <!-- 标签筛选 -->
    <div class="filter-section">
      <div class="filter-tabs">
        <button
          :class="['filter-tab', { active: activeFilter === 'all' }]"
          @click="activeFilter = 'all'"
        >
          全部文章
        </button>
        <button
          :class="['filter-tab', { active: activeFilter === 'published' }]"
          @click="activeFilter = 'published'"
        >
          已发布
        </button>
        <button
          :class="['filter-tab', { active: activeFilter === 'drafts' }]"
          @click="activeFilter = 'drafts'"
        >
          草稿
        </button>
      </div>
    </div>

    <!-- 文章列表 -->
    <div class="posts-table">
      <div class="table-header">
        <div class="header-cell">标题</div>
        <div class="header-cell">作者</div>
        <div class="header-cell">标签</div>
        <div class="header-cell">状态</div>
        <div class="header-cell">浏览量</div>
        <div class="header-cell">发布时间</div>
        <div class="header-cell">操作</div>
      </div>

      <div v-if="filteredPosts.length === 0" class="empty-state">
        <div class="empty-icon">📝</div>
        <h3>暂无文章</h3>
        <p>开始创建你的第一篇文章吧！</p>
        <button @click="createNewPost" class="btn btn-primary">创建文章</button>
      </div>

      <div v-else class="table-body">
        <div
          v-for="post in filteredPosts"
          :key="post.id"
          class="table-row"
        >
          <div class="cell title-cell">
            <div class="post-title">{{ post.title }}</div>
            <div class="post-excerpt">{{ post.excerpt }}</div>
          </div>
          <div class="cell">{{ post.author }}</div>
          <div class="cell">
            <div class="tags-list">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <div class="cell">
            <span
              :class="['status-badge', post.isPublished ? 'published' : 'draft']"
            >
              {{ post.isPublished ? '已发布' : '草稿' }}
            </span>
          </div>
          <div class="cell">{{ post.views }}</div>
          <div class="cell">
            {{ post.publishedAt ? formatDate(post.publishedAt) : '-' }}
          </div>
          <div class="cell actions-cell">
            <div class="action-buttons">
              <button
                @click="editPost(post.id)"
                class="action-btn edit"
                title="编辑"
              >
                ✏️
              </button>
              <button
                v-if="post.isPublished"
                @click="unpublishPost(post.id)"
                class="action-btn unpublish"
                title="取消发布"
              >
                📤
              </button>
              <button
                v-else
                @click="publishPost(post.id)"
                class="action-btn publish"
                title="发布"
              >
                📤
              </button>
              <button
                @click="deletePost(post.id)"
                class="action-btn delete"
                title="删除"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 删除确认对话框 -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click="cancelDelete">
      <div class="modal" @click.stop>
        <h3>确认删除</h3>
        <p>确定要删除文章 "{{ postToDelete?.title }}" 吗？此操作无法撤销。</p>
        <div class="modal-actions">
          <button @click="cancelDelete" class="btn btn-secondary">取消</button>
          <button @click="confirmDelete" class="btn btn-danger">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'

const router = useRouter()
const blogStore = useBlogStore()

// 响应式数据
const activeFilter = ref('all')
const showDeleteConfirm = ref(false)
const postToDelete = ref(null)

// 计算属性
const publishedCount = computed(() => blogStore.publishedPosts.length)
const draftCount = computed(() => blogStore.allDrafts.length)
const totalViews = computed(() => 
  blogStore.publishedPosts.reduce((sum, post) => sum + post.views, 0)
)
const totalTags = computed(() => blogStore.tags.length)

const filteredPosts = computed(() => {
  switch (activeFilter.value) {
    case 'published':
      return blogStore.publishedPosts
    case 'drafts':
      return blogStore.allDrafts
    default:
      return [...blogStore.publishedPosts, ...blogStore.allDrafts]
  }
})

// 方法
const createNewPost = () => {
  router.push('/admin/new')
}

const editPost = (id) => {
  router.push(`/admin/edit/${id}`)
}

const publishPost = (id) => {
  const published = blogStore.publishPost(id)
  if (published) {
    // 可以添加成功提示
  }
}

const unpublishPost = (id) => {
  const draft = blogStore.unpublishPost(id)
  if (draft) {
    // 可以添加成功提示
  }
}

const deletePost = (id) => {
  const post = [...blogStore.posts, ...blogStore.drafts].find(p => p.id === id)
  if (post) {
    postToDelete.value = post
    showDeleteConfirm.value = true
  }
}

const confirmDelete = () => {
  if (postToDelete.value) {
    const success = blogStore.deletePost(postToDelete.value.id)
    if (success) {
      // 可以添加成功提示
    }
    cancelDelete()
  }
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
  postToDelete.value = null
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.admin-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.admin-header h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: #42b883;
  color: white;
}

.btn-primary:hover {
  background: #3aa876;
}

.btn-secondary {
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background: #e9e9e9;
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background: #c0392b;
}

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e1e5e9;
  text-align: center;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: #42b883;
  margin-bottom: 8px;
}

.stat-label {
  color: #666;
  font-size: 14px;
}

/* 筛选标签 */
.filter-section {
  margin-bottom: 20px;
}

.filter-tabs {
  display: flex;
  gap: 10px;
  border-bottom: 1px solid #e1e5e9;
}

.filter-tab {
  padding: 12px 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.filter-tab.active {
  color: #42b883;
  border-bottom-color: #42b883;
}

.filter-tab:hover {
  color: #42b883;
}

/* 文章表格 */
.posts-table {
  background: white;
  border-radius: 8px;
  border: 1px solid #e1e5e9;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
  background: #f8f9fa;
  padding: 15px 20px;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #e1e5e9;
}

.header-cell {
  font-size: 14px;
}

.table-body {
  max-height: 600px;
  overflow-y: auto;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.3s ease;
}

.table-row:hover {
  background: #f8f9fa;
}

.cell {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.title-cell {
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.post-title {
  font-weight: 500;
  color: #333;
}

.post-excerpt {
  color: #666;
  font-size: 12px;
  line-height: 1.4;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tag {
  background: #e9ecef;
  color: #495057;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.published {
  background: #d4edda;
  color: #155724;
}

.status-badge.draft {
  background: #fff3cd;
  color: #856404;
}

.actions-cell {
  justify-content: flex-end;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 6px;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s ease;
  font-size: 16px;
}

.action-btn:hover {
  background: #f0f0f0;
}

.action-btn.edit:hover {
  background: #e3f2fd;
}

.action-btn.publish:hover {
  background: #e8f5e8;
}

.action-btn.unpublish:hover {
  background: #fff3cd;
}

.action-btn.delete:hover {
  background: #ffebee;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.empty-state h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.empty-state p {
  margin: 0 0 20px 0;
}

/* 模态框 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
}

.modal h3 {
  margin: 0 0 15px 0;
  color: #333;
}

.modal p {
  margin: 0 0 20px 0;
  color: #666;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .admin-header {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .header-cell {
    display: none;
  }
  
  .cell {
    padding: 5px 0;
  }
  
  .cell::before {
    content: attr(data-label);
    font-weight: 600;
    margin-right: 10px;
    color: #666;
  }
}
</style> 