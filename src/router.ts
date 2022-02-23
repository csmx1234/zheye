import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import Write from './views/WritePost.vue'
import Posts from './views/PostDetail.vue'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/write',
      name: 'write',
      component: Write
    },
    {
      path: '/posts/:id',
      name: 'posts',
      component: Posts
    }
  ]
})

export default router