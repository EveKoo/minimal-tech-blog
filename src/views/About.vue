<template>
  <div class="about-page">
    <div class="about-container">
      <header class="about-header">
        <h1 class="about-title">关于极简博客</h1>
        <p class="about-subtitle">一个专注于前端技术的极简博客平台</p>
      </header>

      <main class="about-content">
        <section class="about-section">
          <h2 class="section-title">项目特色</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🎨</div>
              <h3 class="feature-title">极简设计</h3>
              <p class="feature-description">
                采用极简主义设计理念，专注于内容本身，提供清爽的阅读体验。
              </p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">📱</div>
              <h3 class="feature-title">响应式布局</h3>
              <p class="feature-description">
                完美适配各种设备，从手机到桌面，都能获得最佳浏览体验。
              </p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">🌙</div>
              <h3 class="feature-title">深色模式</h3>
              <p class="feature-description">
                支持深色/浅色主题切换，保护眼睛，提升夜间阅读体验。
              </p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">⚡</div>
              <h3 class="feature-title">快速加载</h3>
              <p class="feature-description">
                基于 Vite 构建，采用现代技术栈，确保极快的加载速度。
              </p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">📝</div>
              <h3 class="feature-title">Markdown 支持</h3>
              <p class="feature-description">
                完整的 Markdown 渲染支持，代码高亮，让技术文章更易读。
              </p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">🔍</div>
              <h3 class="feature-title">SEO 优化</h3>
              <p class="feature-description">
                针对搜索引擎优化，提高内容被发现和索引的机会。
              </p>
            </div>
          </div>
        </section>

        <section class="about-section">
          <h2 class="section-title">技术栈</h2>
          <div class="tech-stack">
            <div class="tech-category">
              <h3 class="tech-category-title">前端框架</h3>
              <div class="tech-items">
                <span class="tech-item">Vue 3</span>
                <span class="tech-item">Composition API</span>
                <span class="tech-item">Vue Router 4</span>
                <span class="tech-item">Pinia</span>
              </div>
            </div>
            
            <div class="tech-category">
              <h3 class="tech-category-title">构建工具</h3>
              <div class="tech-items">
                <span class="tech-item">Vite</span>
                <span class="tech-item">ESLint</span>
                <span class="tech-item">Prettier</span>
                <span class="tech-item">PWA</span>
              </div>
            </div>
            
            <div class="tech-category">
              <h3 class="tech-category-title">样式与渲染</h3>
              <div class="tech-items">
                <span class="tech-item">原生 CSS</span>
                <span class="tech-item">Marked.js</span>
                <span class="tech-item">Highlight.js</span>
                <span class="tech-item">CSS Grid</span>
              </div>
            </div>
          </div>
        </section>

        <section class="about-section">
          <h2 class="section-title">开发理念</h2>
          <div class="philosophy">
            <div class="philosophy-item">
              <h3 class="philosophy-title">极简至上</h3>
              <p class="philosophy-text">
                我们相信最好的设计是看不见的设计。通过去除不必要的元素，
                让用户专注于内容本身，创造更好的阅读体验。
              </p>
            </div>
            
            <div class="philosophy-item">
              <h3 class="philosophy-title">性能优先</h3>
              <p class="philosophy-text">
                在保证功能完整的前提下，我们始终将性能放在首位。
                快速的加载速度和流畅的交互体验是我们的核心追求。
              </p>
            </div>
            
            <div class="philosophy-item">
              <h3 class="philosophy-title">用户体验</h3>
              <p class="philosophy-text">
                从用户的角度思考每一个细节，包括深色模式、响应式设计、
                无障碍访问等，确保每个用户都能获得最佳体验。
              </p>
            </div>
          </div>
        </section>

        <section class="about-section">
          <h2 class="section-title">开源协议</h2>
          <div class="license">
            <p>
              本项目采用 MIT 开源协议，您可以自由使用、修改和分发。
              如果您觉得这个项目对您有帮助，欢迎给个 ⭐️ 支持一下！
            </p>
            <div class="github-link">
              <a href="https://github.com/your-username/minimal-tech-blog" target="_blank" rel="noopener">
                <span class="github-icon">📦</span>
                查看源码
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
// 关于页面组件
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  background: #fafafa;
}

.dark-theme .about-page {
  background: #1a1a1a;
}

.about-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.about-header {
  text-align: center;
  margin-bottom: 4rem;
  padding: 3rem 0;
}

.about-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2c3e50;
  letter-spacing: -1px;
}

.dark-theme .about-title {
  color: #e1e5e9;
}

.about-subtitle {
  font-size: 1.25rem;
  color: #666;
  line-height: 1.6;
}

.dark-theme .about-subtitle {
  color: #ccc;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.about-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #2c3e50;
  text-align: center;
}

.dark-theme .section-title {
  color: #e1e5e9;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: #42b883;
}

.dark-theme .feature-card {
  background: #2c2c2c;
  border-color: #404040;
}

.dark-theme .feature-card:hover {
  border-color: #42b883;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.dark-theme .feature-title {
  color: #e1e5e9;
}

.feature-description {
  color: #666;
  line-height: 1.6;
}

.dark-theme .feature-description {
  color: #ccc;
}

.tech-stack {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.tech-category {
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  padding: 2rem;
}

.dark-theme .tech-category {
  background: #2c2c2c;
  border-color: #404040;
}

.tech-category-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.dark-theme .tech-category-title {
  color: #e1e5e9;
}

.tech-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-item {
  background: #f1f3f4;
  color: #666;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.dark-theme .tech-item {
  background: #404040;
  color: #ccc;
}

.philosophy {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.philosophy-item {
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  padding: 2rem;
}

.dark-theme .philosophy-item {
  background: #2c2c2c;
  border-color: #404040;
}

.philosophy-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #42b883;
}

.philosophy-text {
  color: #666;
  line-height: 1.6;
}

.dark-theme .philosophy-text {
  color: #ccc;
}

.license {
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
}

.dark-theme .license {
  background: #2c2c2c;
  border-color: #404040;
}

.license p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.dark-theme .license p {
  color: #ccc;
}

.github-link {
  display: inline-block;
}

.github-link a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #42b883;
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.github-link a:hover {
  background: #3aa876;
}

.github-icon {
  font-size: 1.2rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-container {
    padding: 1rem;
  }
  
  .about-title {
    font-size: 2.5rem;
  }
  
  .about-subtitle {
    font-size: 1.1rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .tech-stack {
    grid-template-columns: 1fr;
  }
  
  .philosophy {
    grid-template-columns: 1fr;
  }
  
  .feature-card,
  .tech-category,
  .philosophy-item {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .about-title {
    font-size: 2rem;
  }
  
  .about-header {
    padding: 2rem 0;
  }
  
  .about-content {
    gap: 3rem;
  }
  
  .feature-card,
  .tech-category,
  .philosophy-item,
  .license {
    padding: 1rem;
  }
}
</style> 