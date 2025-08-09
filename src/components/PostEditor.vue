<template>
  <div class="post-editor">
    <div class="editor-header">
      <div class="header-left">
        <button @click="goBack" class="back-btn">
          <span>←</span> 返回
        </button>
        <h1>{{ isEditing ? '编辑文章' : '创建新文章' }}</h1>
      </div>
      <div class="header-right">
        <button @click="saveDraft" class="btn btn-secondary" :disabled="!canSave">
          保存草稿
        </button>
        <button @click="publishPost" class="btn btn-primary" :disabled="!canPublish">
          {{ isEditing ? '更新发布' : '发布文章' }}
        </button>
      </div>
    </div>

    <div class="editor-content">
      <div class="form-section">
        <div class="form-group">
          <label for="title">文章标题 *</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            placeholder="输入文章标题..."
            class="form-input"
            @input="updateSlug"
          />
        </div>

        <div class="form-group">
          <label for="slug">URL 别名</label>
          <input
            id="slug"
            v-model="form.slug"
            type="text"
            placeholder="文章 URL 别名..."
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="excerpt">文章摘要</label>
          <textarea
            id="excerpt"
            v-model="form.excerpt"
            placeholder="输入文章摘要..."
            class="form-textarea"
            rows="3"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="author">作者</label>
          <input
            id="author"
            v-model="form.author"
            type="text"
            placeholder="作者姓名..."
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="tags">标签</label>
          <div class="tags-input">
            <div class="tags-list">
              <span
                v-for="tag in form.tags"
                :key="tag"
                class="tag"
                @click="removeTag(tag)"
              >
                {{ tag }} ×
              </span>
            </div>
            <input
              v-model="newTag"
              type="text"
              placeholder="输入标签..."
              class="tag-input"
              @keydown.enter="addTag"
              @blur="addTag"
            />
          </div>
        </div>
      </div>

      <div class="editor-section">
        <div class="editor-tabs">
          <button
            :class="['tab-btn', { active: activeTab === 'write' }]"
            @click="activeTab = 'write'"
          >
            编写
          </button>
          <button
            :class="['tab-btn', { active: activeTab === 'preview' }]"
            @click="activeTab = 'preview'"
          >
            预览
          </button>
          <button
            :class="['tab-btn', { active: activeTab === 'split' }]"
            @click="activeTab = 'split'"
          >
            分屏
          </button>
        </div>

        <div class="editor-panels">
          <!-- 编写面板 -->
          <div
            v-show="activeTab === 'write' || activeTab === 'split'"
            class="write-panel"
          >
            <textarea
              v-model="form.content"
              placeholder="在这里编写你的文章内容，支持 Markdown 语法..."
              class="markdown-editor"
              @input="autoSave"
            ></textarea>
          </div>

          <!-- 预览面板 -->
          <div
            v-show="activeTab === 'preview' || activeTab === 'split'"
            class="preview-panel"
          >
            <div class="preview-content">
              <MarkdownRenderer :content="form.content || '暂无内容'" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 保存状态提示 -->
    <div v-if="saveStatus" class="save-status" :class="saveStatus.type">
      {{ saveStatus.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import MarkdownRenderer from './MarkdownRenderer.vue'

const router = useRouter()
const route = useRoute()
const blogStore = useBlogStore()

// 响应式数据
const activeTab = ref('write')
const newTag = ref('')
const saveStatus = ref(null)
const autoSaveTimer = ref(null)

// 表单数据
const form = reactive({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  author: '',
  tags: []
})

// 计算属性
const isEditing = computed(() => route.params.id)
const canSave = computed(() => form.title.trim() || form.content.trim())
const canPublish = computed(() => form.title.trim() && form.content.trim())

// 方法
const goBack = () => {
  router.push('/admin')
}

const updateSlug = () => {
  if (!form.slug) {
    form.slug = blogStore.generateSlug(form.title)
  }
}

const addTag = () => {
  const tag = newTag.value.trim()
  if (tag && !form.tags.includes(tag)) {
    form.tags.push(tag)
    newTag.value = ''
  }
}

const removeTag = (tag) => {
  const index = form.tags.indexOf(tag)
  if (index > -1) {
    form.tags.splice(index, 1)
  }
}

const showSaveStatus = (message, type = 'success') => {
  saveStatus.value = { message, type }
  setTimeout(() => {
    saveStatus.value = null
  }, 3000)
}

const autoSave = () => {
  if (autoSaveTimer.value) {
    clearTimeout(autoSaveTimer.value)
  }
  
  autoSaveTimer.value = setTimeout(() => {
    if (canSave.value) {
      saveDraft(true)
    }
  }, 2000)
}

const saveDraft = (silent = false) => {
  if (!canSave.value) return

  const postData = {
    title: form.title,
    slug: form.slug,
    excerpt: form.excerpt,
    content: form.content,
    author: form.author,
    tags: form.tags,
    isPublished: false
  }

  if (isEditing.value) {
    const updated = blogStore.updatePost(parseInt(route.params.id), postData)
    if (updated) {
      if (!silent) showSaveStatus('草稿已保存', 'success')
    }
  } else {
    const newPost = blogStore.createPost(postData)
    if (newPost) {
      if (!silent) showSaveStatus('草稿已保存', 'success')
      // 更新路由到编辑模式
      router.replace(`/admin/edit/${newPost.id}`)
    }
  }
}

const publishPost = () => {
  if (!canPublish.value) return

  const postData = {
    title: form.title,
    slug: form.slug,
    excerpt: form.excerpt,
    content: form.content,
    author: form.author,
    tags: form.tags,
    isPublished: true
  }

  if (isEditing.value) {
    const updated = blogStore.updatePost(parseInt(route.params.id), postData)
    if (updated) {
      showSaveStatus('文章已更新并发布', 'success')
      setTimeout(() => {
        router.push(`/post/${updated.slug}`)
      }, 1500)
    }
  } else {
    const newPost = blogStore.createPost(postData)
    if (newPost) {
      showSaveStatus('文章已发布', 'success')
      setTimeout(() => {
        router.push(`/post/${newPost.slug}`)
      }, 1500)
    }
  }
}

const loadPost = (id) => {
  const post = blogStore.posts.find(p => p.id === id) || 
               blogStore.drafts.find(d => d.id === id)
  
  if (post) {
    form.title = post.title
    form.slug = post.slug
    form.excerpt = post.excerpt
    form.content = post.content
    form.author = post.author
    form.tags = [...post.tags]
  }
}

// 生命周期
onMounted(() => {
  if (isEditing.value) {
    loadPost(parseInt(route.params.id))
  }
})

onBeforeUnmount(() => {
  if (autoSaveTimer.value) {
    clearTimeout(autoSaveTimer.value)
  }
})
</script>

<style scoped>
.post-editor {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: calc(100vh - 80px);
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e1e5e9;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: none;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #f5f5f5;
}

.header-left h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.header-right {
  display: flex;
  gap: 12px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #42b883;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #3aa876;
}

.btn-secondary {
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.btn-secondary:hover:not(:disabled) {
  background: #e9e9e9;
}

.editor-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
}

.form-section {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  height: fit-content;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #42b883;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.tags-input {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  background: white;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}

.tag {
  background: #42b883;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.tag:hover {
  background: #3aa876;
}

.tag-input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 14px;
}

.editor-section {
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  overflow: hidden;
}

.editor-tabs {
  display: flex;
  border-bottom: 1px solid #e1e5e9;
}

.tab-btn {
  padding: 12px 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  transition: all 0.3s ease;
}

.tab-btn.active {
  color: #42b883;
  border-bottom: 2px solid #42b883;
}

.tab-btn:hover {
  background: #f5f5f5;
}

.editor-panels {
  display: flex;
  height: 600px;
}

.write-panel,
.preview-panel {
  flex: 1;
  overflow: hidden;
}

.preview-panel {
  border-left: 1px solid #e1e5e9;
}

.markdown-editor {
  width: 100%;
  height: 100%;
  padding: 20px;
  border: none;
  outline: none;
  resize: none;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}

.preview-content {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}

.save-status {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  z-index: 1000;
  animation: slideIn 0.3s ease;
}

.save-status.success {
  background: #42b883;
}

.save-status.error {
  background: #e74c3c;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .editor-content {
    grid-template-columns: 1fr;
  }
  
  .editor-header {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
  
  .header-right {
    width: 100%;
    justify-content: space-between;
  }
  
  .editor-panels {
    flex-direction: column;
    height: auto;
  }
  
  .preview-panel {
    border-left: none;
    border-top: 1px solid #e1e5e9;
  }
}
</style> 