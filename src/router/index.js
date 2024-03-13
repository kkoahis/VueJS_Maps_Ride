import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import LandingView from '@/views/LandingView.vue'
import axios from 'axios'

const routes = [
  {
    path: '/landing',
    name: 'landing',
    component: LandingView
  },
  {
    path: '/',
    name: 'login',
    component: LoginView

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (to.name === 'login') {
    return true
  }
  if (!localStorage.getItem('token')) {
    return {
      name: 'login'
    }
  }

  checkTokenAuthenticity()
})

const checkTokenAuthenticity = () => {
  axios.get('http://localhost:8000/api/user', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then((response) => {
    console.log(response)
    return true
  }).catch((error) => {
    console.log(error)
    localStorage.removeItem('token')
    router.push({
      name: 'login'
    })
  })
}

export default router
