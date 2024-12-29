import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'address',
      component: () => import('../views/AddressPage.vue'),
    },
  ],
})

export default router
