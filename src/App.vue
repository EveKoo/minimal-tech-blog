<template>
  <div id="app">
    <Navigation />
    <router-view />
  </div>
</template>

<script setup>
import Navigation from './components/Navigation.vue'
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
  color: #333;
  background-color: #ffffff;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 深色主题样式 */
.dark-theme {
  background-color: #1a1a1a;
  color: #e1e5e9;
}

.dark-theme body {
  background-color: #1a1a1a;
  color: #e1e5e9;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.dark-theme ::-webkit-scrollbar-track {
  background: #2c2c2c;
}

.dark-theme ::-webkit-scrollbar-thumb {
  background: #555;
}

.dark-theme ::-webkit-scrollbar-thumb:hover {
  background: #666;
}

/* 选择文本样式 */
::selection {
  background-color: #42b883;
  color: white;
}

.dark-theme ::selection {
  background-color: #42b883;
  color: white;
}

/* 链接样式 */
a {
  color: #42b883;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #3aa876;
}

/* 按钮样式 */
button {
  font-family: inherit;
  cursor: pointer;
}

/* 图片样式 */
img {
  max-width: 100%;
  height: auto;
}

/* 代码样式 */
code {
  font-family: 'Fira Code', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace;
}

/* 响应式字体大小 */
@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  html {
    font-size: 13px;
  }
}

/* 动画 */
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

.fade-in {
  animation: fadeIn 0.6s ease-out;
}

/* 工具类 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
}
</style>
