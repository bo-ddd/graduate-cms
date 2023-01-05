import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/layout/layout.vue'
import Login from '@/views/Login/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/userAdmin',
          name: 'userAdmin',
          component: () => import('@/views/user/UserAdmin.vue')
        }, {
          path: '/corporateManagement',
          name: 'corporateManagement',
          component: () => import('@/views/corporateManagement/CorporateManagement.vue')
        }, {
          path: '/agentManagement',
          name: 'agentManagement',
          component: () => import('@/views/agentManagement/AgentManagement.vue')
        }, {
          path: '/jobFairManagement',
          name: 'jobFairManagement',
          component: () => import('@/views/jobFairManagement/JobFairManagement.vue')
        }, {
          path: '/membershipCardManagement',
          name: 'membershipCardManagement',
          component: () => import('@/views/membershipCardManagement/MembershipCardManagement.vue')
        }, {
          path: '/selectionBoxManagement',
          name: 'selectionBoxManagement',
          component: () => import('@/views/selectionBoxManagement/SelectionBoxManagement.vue')
        }, {
          path: '/membershipManagement',
          name: 'membershipManagement',
          component: () => import('@/views/membershipManagement/MembershipManagement.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: () => import('@/views/register/register.vue'),
    // }
  ]
})

router.beforeEach( (to) => {
  const token = sessionStorage.getItem('token');
  if (to.name == 'login') {
    return true;
  } else if (to.name != 'login' && !token) {
    return { name: 'login' };
  }
})

export default router
