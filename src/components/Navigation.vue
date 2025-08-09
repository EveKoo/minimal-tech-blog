<template>
  <nav class="navigation">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">
        <span class="logo-text">极简博客</span>
      </router-link>
      
      <div class="nav-links">
        <router-link to="/" class="nav-link" active-class="active">
          首页
        </router-link>
        <router-link to="/about" class="nav-link" active-class="active">
          关于
        </router-link>
        <router-link to="/admin" class="nav-link admin-link" active-class="active">
          管理
        </router-link>
      </div>
      
      <button class="theme-toggle" @click="toggleTheme" :title="themeIcon.title">
        <span class="theme-icon">{{ themeIcon.symbol }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'

const isDark = ref(false)

const themeIcon = computed(() => {
  return isDark.value 
    ? { symbol: '☀️', title: '切换到浅色模式' }
    : { symbol: '🌙', title: '切换到深色模式' }
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark-theme', isDark.value)
  
  // 保存主题偏好到本地存储
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

// 初始化主题
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
  document.documentElement.classList.toggle('dark-theme', isDark.value)
}

// 组件挂载时初始化主题
initTheme()
</script>

<style scoped>
.navigation {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e1e5e9;
  transition: all 0.3s ease;
}

.dark-theme .navigation {
  background: rgba(26, 26, 26, 0.95);
  border-bottom-color: #404040;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
}

.nav-logo {
  text-decoration: none;
  color: inherit;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #42b883;
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #666;
  font-weight: 500;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #42b883;
}

.nav-link.active {
  color: #42b883;
  border-bottom-color: #42b883;
}

.dark-theme .nav-link {
  color: #ccc;
}

.dark-theme .nav-link:hover,
.dark-theme .nav-link.active {
  color: #42b883;
}

.admin-link {
  background: #42b883;
  color: white !important;
  padding: 0.5rem 1rem !important;
  border-radius: 6px;
  border-bottom: none !important;
}

.admin-link:hover {
  background: #3aa876;
  color: white !important;
}

.admin-link.active {
  background: #3aa876;
  color: white !important;
  border-bottom: none !important;
}

.dark-theme .admin-link {
  background: #42b883;
  color: white !important;
}

.dark-theme .admin-link:hover,
.dark-theme .admin-link.active {
  background: #3aa876;
  color: white !important;
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background-color: #f1f3f4;
}

.dark-theme .theme-toggle:hover {
  background-color: #404040;
}

.theme-icon {
  font-size: 1.2rem;
  line-height: 1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .logo-text {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .nav-links {
    gap: 0.5rem;
  }
  
  .nav-link {
    font-size: 0.9rem;
  }
}
</style> 