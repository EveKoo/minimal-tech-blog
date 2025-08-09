<template>
  <div class="markdown-content" v-html="renderedContent"></div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

// 配置 marked
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value
      } catch (err) {
        console.error('代码高亮错误:', err)
      }
    }
    return hljs.highlightAuto(code).value
  },
  breaks: true,
  gfm: true
})

// 渲染 Markdown 内容
const renderedContent = computed(() => {
  return marked(props.content)
})

// 组件挂载后初始化代码高亮
onMounted(() => {
  // 确保所有代码块都被高亮
  const codeBlocks = document.querySelectorAll('pre code')
  codeBlocks.forEach(block => {
    hljs.highlightElement(block)
  })
})
</script>

<style scoped>
.markdown-content {
  line-height: 1.6;
  color: #333;
}

.markdown-content :deep(h1) {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 2rem 0 1rem;
  color: #1a1a1a;
  border-bottom: 3px solid #e1e5e9;
  padding-bottom: 0.5rem;
}

.markdown-content :deep(h2) {
  font-size: 2rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
  color: #2c3e50;
}

.markdown-content :deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1.25rem 0 0.75rem;
  color: #34495e;
}

.markdown-content :deep(h4) {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1rem 0 0.5rem;
  color: #34495e;
}

.markdown-content :deep(p) {
  margin: 1rem 0;
  text-align: justify;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.markdown-content :deep(li) {
  margin: 0.5rem 0;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid #42b883;
  margin: 1.5rem 0;
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  font-style: italic;
}

.markdown-content :deep(code) {
  background-color: #f1f3f4;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.9em;
}

.markdown-content :deep(pre) {
  background-color: #f8f9fa;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  padding: 1rem;
  margin: 1.5rem 0;
  overflow-x: auto;
}

.markdown-content :deep(pre code) {
  background: none;
  padding: 0;
  border-radius: 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

.markdown-content :deep(a) {
  color: #42b883;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease;
}

.markdown-content :deep(a:hover) {
  border-bottom-color: #42b883;
}

.markdown-content :deep(strong) {
  font-weight: 600;
  color: #2c3e50;
}

.markdown-content :deep(em) {
  font-style: italic;
  color: #34495e;
}

.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  border: 1px solid #e1e5e9;
  padding: 0.75rem;
  text-align: left;
}

.markdown-content :deep(th) {
  background-color: #f8f9fa;
  font-weight: 600;
}

.markdown-content :deep(hr) {
  border: none;
  border-top: 2px solid #e1e5e9;
  margin: 2rem 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .markdown-content :deep(h1) {
    font-size: 2rem;
  }
  
  .markdown-content :deep(h2) {
    font-size: 1.75rem;
  }
  
  .markdown-content :deep(h3) {
    font-size: 1.5rem;
  }
  
  .markdown-content :deep(pre) {
    padding: 0.75rem;
  }
}
</style> 