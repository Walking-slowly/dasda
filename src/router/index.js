import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

/* Router Modules */
// import chartsRouter from './modules/charts'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        //using el svg icon, the elSvgIcon first when at the same time using elSvgIcon and icon
        meta: { title: 'Dashboard', elSvgIcon: 'Fold' }
      }
    ]
  },
  // chartsRouter,
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/home',
    name: 'Home',
    alwaysShow: true, 
    component: () => import('@/views/dashboard/index.vue'),
    //using el svg icon, the elSvgIcon first when at the same time using elSvgIcon and icon
    meta: { title: '首页', elSvgIcon: ' ' }
  },
  {
    path: '/permission',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
    },
    children: [
      {
        path: '/permission/directive',
        component: () => import('@/views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: '测试测试'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: '/code-index',
        component: () => import('@/views/permission/CodePermission.vue'),
        name: 'CodePermission',
        meta: {
          title: '测试'
        }
      },
      {
        path: '/code-page',
        component: () => import('@/views/permission/CodePage.vue'),
        name: 'CodePage',
        meta: {
          title: '测试测试测试测试',
          code: 1
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  // using pathMatch install of "*" in vue-router 4.0
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})

export default router
