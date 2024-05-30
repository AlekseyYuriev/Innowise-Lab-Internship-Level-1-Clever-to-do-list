import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/signin',
      component: () => import('../views/SignIn.vue')
    },
    {
      path: '/',
      component: () => import('../views/MainPage.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tasks/:id',
      component: () => import('../views/TaskPage.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve) => {
    const removeListener = onAuthStateChanged(getAuth(), (user) => {
      removeListener()
      resolve(user)
    })
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next()
    } else {
      next('/signin')
    }
  } else {
    next()
  }
})

export default router
