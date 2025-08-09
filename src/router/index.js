import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import About from '../views/About.vue'
import Admin from '../views/Admin.vue'
import PostEditor from '../components/PostEditor.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '极简技术博客 - 首页'
    }
  },
  {
    path: '/post/:slug',
    name: 'Post',
    component: Post,
    meta: {
      title: '文章详情'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '关于 - 极简技术博客'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      title: '管理后台 - 极简技术博客'
    }
  },
  {
    path: '/admin/new',
    name: 'NewPost',
    component: PostEditor,
    meta: {
      title: '创建新文章 - 极简技术博客'
    }
  },
  {
    path: '/admin/edit/:id',
    name: 'EditPost',
    component: PostEditor,
    meta: {
      title: '编辑文章 - 极简技术博客'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫 - 更新页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router 