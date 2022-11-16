import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/layout/layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children:[
      {
        path:'/userAdmin',
        name:'userAdmin',
        component:()=> import('@/views/user/UserAdmin.vue')
      },{
        path:'/corporateManagement',
        name:'corporateManagement',
        component:()=> import('@/views/corporateManagement/CorporateManagement.vue')
      }
      ]
    },
  ]
})

export default router
