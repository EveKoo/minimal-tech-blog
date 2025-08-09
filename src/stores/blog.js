import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBlogStore = defineStore('blog', () => {
  // 文章数据
  const posts = ref([
    {
      id: 1,
      slug: 'vue3-composition-api-guide',
      title: 'Vue 3 Composition API 完全指南',
      excerpt: '深入理解 Vue 3 的 Composition API，掌握现代 Vue 开发的核心概念和最佳实践。',
      content: `# Vue 3 Composition API 完全指南

Vue 3 的 Composition API 是一个革命性的特性，它为我们提供了更好的逻辑复用和代码组织方式。

## 什么是 Composition API？

Composition API 是 Vue 3 中新增的一种编写组件逻辑的方式，它允许我们使用函数来组织代码，而不是依赖选项式 API 的选项。

### 核心概念

1. **响应式数据**
\`\`\`javascript
import { ref, reactive } from 'vue'

// 使用 ref 创建响应式数据
const count = ref(0)

// 使用 reactive 创建响应式对象
const state = reactive({
  name: 'Vue 3',
  version: '3.4.0'
})
\`\`\`

2. **计算属性**
\`\`\`javascript
import { computed } from 'vue'

const doubleCount = computed(() => count.value * 2)
\`\`\`

3. **生命周期钩子**
\`\`\`javascript
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('组件已挂载')
})

onUnmounted(() => {
  console.log('组件已卸载')
})
\`\`\`

## 实际应用示例

让我们创建一个简单的计数器组件：

\`\`\`vue
<template>
  <div class="counter">
    <h2>计数器: {{ count }}</h2>
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
    <p>双倍值: {{ doubleCount }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

const increment = () => count.value++
const decrement = () => count.value--
</script>
\`\`\`

## 优势

1. **更好的逻辑复用** - 可以轻松提取和复用逻辑
2. **更好的 TypeScript 支持** - 完整的类型推断
3. **更小的打包体积** - 更好的 tree-shaking
4. **更好的代码组织** - 相关逻辑可以组织在一起

## 总结

Composition API 是 Vue 3 的重要特性，它为我们提供了更灵活、更强大的组件编写方式。虽然学习曲线可能稍陡，但掌握后会发现它带来的巨大优势。`,
      author: 'Vue 开发者',
      publishedAt: '2024-01-15',
      tags: ['Vue', 'JavaScript', '前端'],
      isPublished: true,
      isDraft: false,
      readTime: 8,
      views: 1250
    },
    {
      id: 2,
      slug: 'modern-css-techniques',
      title: '现代 CSS 技术深度解析',
      excerpt: '探索 CSS Grid、Flexbox、CSS 变量等现代 CSS 技术，提升你的前端开发技能。',
      content: `# 现代 CSS 技术深度解析

CSS 已经发展成为一个强大的样式语言，现代 CSS 技术为我们提供了前所未有的布局和样式控制能力。

## CSS Grid 布局

CSS Grid 是一个二维布局系统，非常适合创建复杂的页面布局。

### 基本概念

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
}

.item {
  grid-column: span 2;
  grid-row: span 2;
}
\`\`\`

### 响应式 Grid

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
\`\`\`

## Flexbox 布局

Flexbox 是一维布局系统，非常适合创建灵活的组件布局。

### 常用属性

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.flex-item {
  flex: 1;
  flex-shrink: 0;
}
\`\`\`

## CSS 变量

CSS 变量（自定义属性）让我们可以创建可重用的值。

### 定义和使用

\`\`\`css
:root {
  --primary-color: #42b883;
  --secondary-color: #35495e;
  --font-size-base: 16px;
  --spacing-unit: 8px;
}

.button {
  background-color: var(--primary-color);
  padding: calc(var(--spacing-unit) * 2);
  font-size: var(--font-size-base);
}
\`\`\`

## 现代选择器

### 伪类选择器

\`\`\`css
/* 选择第一个子元素 */
.item:first-child {
  border-radius: 8px 0 0 8px;
}

/* 选择最后一个子元素 */
.item:last-child {
  border-radius: 0 8px 8px 0;
}

/* 选择偶数元素 */
.item:nth-child(even) {
  background-color: #f5f5f5;
}
\`\`\`

## 动画和过渡

### CSS 动画

\`\`\`css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate {
  animation: fadeIn 0.5s ease-out;
}
\`\`\`

### CSS 过渡

\`\`\`css
.button {
  transition: all 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
\`\`\`

## 总结

现代 CSS 技术为我们提供了强大的工具来创建美观、响应式的用户界面。掌握这些技术将大大提升你的前端开发能力。`,
      author: 'CSS 专家',
      publishedAt: '2024-01-10',
      tags: ['CSS', '前端', '设计'],
      isPublished: true,
      isDraft: false,
      readTime: 12,
      views: 890
    },
    {
      id: 3,
      slug: 'javascript-es6-features',
      title: 'JavaScript ES6+ 核心特性详解',
      excerpt: '全面了解 JavaScript ES6 及后续版本的重要特性，包括箭头函数、解构赋值、Promise 等。',
      content: `# JavaScript ES6+ 核心特性详解

ES6（ECMAScript 2015）是 JavaScript 语言的一次重大更新，引入了许多现代编程特性。

## 箭头函数

箭头函数提供了更简洁的函数语法。

### 基本语法

\`\`\`javascript
// 传统函数
function add(a, b) {
  return a + b;
}

// 箭头函数
const add = (a, b) => a + b;

// 多行箭头函数
const multiply = (a, b) => {
  const result = a * b;
  return result;
};
\`\`\`

### this 绑定

\`\`\`javascript
class Timer {
  constructor() {
    this.seconds = 0;
  }

  start() {
    // 箭头函数保持 this 绑定
    setInterval(() => {
      this.seconds++;
      console.log(this.seconds);
    }, 1000);
  }
}
\`\`\`

## 解构赋值

解构赋值允许我们从数组或对象中提取值。

### 数组解构

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// 基本解构
const [first, second] = numbers;
console.log(first); // 1
console.log(second); // 2

// 跳过元素
const [a, , c] = numbers;
console.log(a); // 1
console.log(c); // 3

// 剩余元素
const [x, y, ...rest] = numbers;
console.log(rest); // [3, 4, 5]
\`\`\`

### 对象解构

\`\`\`javascript
const user = {
  name: 'John',
  age: 30,
  email: 'john@example.com'
};

// 基本解构
const { name, age } = user;
console.log(name); // 'John'
console.log(age); // 30

// 重命名
const { name: userName } = user;
console.log(userName); // 'John'

// 默认值
const { country = 'Unknown' } = user;
console.log(country); // 'Unknown'
\`\`\`

## 模板字符串

模板字符串提供了更灵活的字符串插值。

\`\`\`javascript
const name = 'World';
const greeting = \`Hello, \${name}!\`;

// 多行字符串
const html = \`
  <div class="container">
    <h1>\${title}</h1>
    <p>\${content}</p>
  </div>
\`;

// 表达式
const price = 29.99;
const message = \`Total: $\${price.toFixed(2)}\`;
\`\`\`

## Promise 和异步编程

### Promise 基础

\`\`\`javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, name: 'John' };
      resolve(data);
    }, 1000);
  });
};

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
\`\`\`

### async/await

\`\`\`javascript
async function getUserData() {
  try {
    const response = await fetch('/api/user');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
\`\`\`

## 模块系统

### 导出

\`\`\`javascript
// 命名导出
export const PI = 3.14159;
export function square(x) {
  return x * x;
}

// 默认导出
export default class Calculator {
  add(a, b) {
    return a + b;
  }
}
\`\`\`

### 导入

\`\`\`javascript
// 命名导入
import { PI, square } from './math.js';

// 默认导入
import Calculator from './calculator.js';

// 混合导入
import Calculator, { PI } from './math.js';
\`\`\`

## 总结

ES6+ 的特性让 JavaScript 变得更加强大和易用。掌握这些特性将大大提升你的开发效率和代码质量。`,
      author: 'JavaScript 开发者',
      publishedAt: '2024-01-05',
      tags: ['JavaScript', 'ES6', '前端'],
      isPublished: true,
      isDraft: false,
      readTime: 15,
      views: 2100
    }
  ])

  // 草稿文章
  const drafts = ref([
    {
      id: 4,
      slug: 'react-vs-vue-comparison',
      title: 'React vs Vue：深度对比分析',
      excerpt: '详细对比 React 和 Vue 的优缺点，帮助你选择最适合的前端框架。',
      content: `# React vs Vue：深度对比分析

React 和 Vue 是目前最流行的前端框架，它们各有优势...

[这是草稿内容，尚未完成]`,
      author: '前端架构师',
      publishedAt: null,
      tags: ['React', 'Vue', '前端', '对比'],
      isPublished: false,
      isDraft: true,
      readTime: 0,
      views: 0
    }
  ])

  // 当前编辑的文章
  const currentEditingPost = ref(null)

  // 计算属性
  const publishedPosts = computed(() => posts.value.filter(post => post.isPublished))
  const sortedPosts = computed(() => [...publishedPosts.value].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)))
  const allDrafts = computed(() => drafts.value.filter(draft => draft.isDraft))
  
  const tags = computed(() => {
    const tagSet = new Set()
    publishedPosts.value.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet)
  })

  // 方法
  const getPostBySlug = (slug) => {
    return posts.value.find(post => post.slug === slug)
  }

  const getPostsByTag = (tag) => {
    return publishedPosts.value.filter(post => post.tags.includes(tag))
  }

  const setCurrentPost = (post) => {
    currentEditingPost.value = post
  }

  // 文章管理方法
  const createPost = (postData) => {
    const newPost = {
      id: Date.now(),
      slug: postData.slug || generateSlug(postData.title),
      title: postData.title,
      excerpt: postData.excerpt,
      content: postData.content,
      author: postData.author || '匿名作者',
      publishedAt: null,
      tags: postData.tags || [],
      isPublished: false,
      isDraft: true,
      readTime: calculateReadTime(postData.content),
      views: 0
    }
    
    if (postData.isPublished) {
      newPost.isPublished = true
      newPost.isDraft = false
      newPost.publishedAt = new Date().toISOString().split('T')[0]
      posts.value.push(newPost)
    } else {
      drafts.value.push(newPost)
    }
    
    return newPost
  }

  const updatePost = (id, updates) => {
    const postIndex = posts.value.findIndex(post => post.id === id)
    const draftIndex = drafts.value.findIndex(draft => draft.id === id)
    
    if (postIndex !== -1) {
      const updatedPost = { ...posts.value[postIndex], ...updates }
      if (updates.content) {
        updatedPost.readTime = calculateReadTime(updates.content)
      }
      posts.value[postIndex] = updatedPost
      return updatedPost
    } else if (draftIndex !== -1) {
      const updatedDraft = { ...drafts.value[draftIndex], ...updates }
      if (updates.content) {
        updatedDraft.readTime = calculateReadTime(updates.content)
      }
      drafts.value[draftIndex] = updatedDraft
      return updatedDraft
    }
    
    return null
  }

  const deletePost = (id) => {
    const postIndex = posts.value.findIndex(post => post.id === id)
    const draftIndex = drafts.value.findIndex(draft => draft.id === id)
    
    if (postIndex !== -1) {
      posts.value.splice(postIndex, 1)
      return true
    } else if (draftIndex !== -1) {
      drafts.value.splice(draftIndex, 1)
      return true
    }
    
    return false
  }

  const publishPost = (id) => {
    const draftIndex = drafts.value.findIndex(draft => draft.id === id)
    if (draftIndex !== -1) {
      const draft = drafts.value[draftIndex]
      const publishedPost = {
        ...draft,
        isPublished: true,
        isDraft: false,
        publishedAt: new Date().toISOString().split('T')[0]
      }
      
      posts.value.push(publishedPost)
      drafts.value.splice(draftIndex, 1)
      return publishedPost
    }
    return null
  }

  const unpublishPost = (id) => {
    const postIndex = posts.value.findIndex(post => post.id === id)
    if (postIndex !== -1) {
      const post = posts.value[postIndex]
      const draft = {
        ...post,
        isPublished: false,
        isDraft: true,
        publishedAt: null
      }
      
      drafts.value.push(draft)
      posts.value.splice(postIndex, 1)
      return draft
    }
    return null
  }

  // 工具方法
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  return {
    posts,
    drafts,
    currentEditingPost,
    publishedPosts,
    sortedPosts,
    allDrafts,
    tags,
    getPostBySlug,
    getPostsByTag,
    setCurrentPost,
    createPost,
    updatePost,
    deletePost,
    publishPost,
    unpublishPost,
    generateSlug,
    calculateReadTime
  }
}) 