import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import LandingView from '@/views/LandingView.vue'
import LocationView from '@/views/LocationView.vue'
import MapView from '@/views/MapView.vue'
import TripView from '@/views/TripView.vue'

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
  },
  {
    path: '/location',
    name: 'location',
    component: LocationView
  },
  {
    path: '/map',
    name: 'map',
    component: MapView
  },
  {
    path: '/trip',
    name: 'trip',
    component: TripView
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'login' }
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
  }).then(() => {
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
