import DashboardLayout from './layout/DashboardLayout'
import AuthLayout from './layout/AuthLayout'

export const cbadminRoutes = {
  'dashboard':
  {
    path: '/',
    component: DashboardLayout,
    children: []
  },
  'user':
    {
      path: '/user',
      component: DashboardLayout,
      children: [
        {
          path: 'edit/:userId?',
          name: 'userprofile',
          component: () => import('./views/User/Edit.vue')
        },
        {
          path: 'list',
          name: 'userlist',
          component: () => import('./views/User/List.vue')
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('./views/Profile.vue')
        }
      ]
    },
  'role':
    {
      path: '/role',
      component: DashboardLayout,
      children: [
        {
          path: 'list',
          name: 'rolelist',
          component: () => import('./views/Role/List.vue')
        },
        {
          path: 'edit/:roleId',
          name: 'roleedit',
          component: () => import('./views/Role/Edit.vue')
        }
      ]
    },
  'permission':
    {
      path: '/permission',
      component: DashboardLayout,
      children: [
        {
          path: 'list',
          name: 'permissionlist',
          component: () => import('./views/Permission/List.vue')
        },
        {
          path: 'edit/:permissionId',
          name: 'permissionedit',
          component: () => import('./views/Permission/Edit.vue')
        },
        {
          path: 'new',
          name: 'permissionnew',
          component: () => import('./views/Permission/Edit.vue')
        }
      ]
    },
  'permissiongroup':
    {
      path: '/permissiongroup',
      component: DashboardLayout,
      children: [
        {
          path: 'list',
          name: 'permissiongrouplist',
          component: () => import('./views/PermissionGroup/List.vue')
        },
        {
          path: 'edit/:permissionGroupId',
          name: 'permissiongroupedit',
          component: () => import('./views/PermissionGroup/Edit.vue')
        },
        {
          path: 'new',
          name: 'permissiongroupnew',
          component: () => import('./views/PermissionGroup/Edit.vue')
        }
      ]
    },
  'authentication':
    {
      path: '/',
      component: AuthLayout,
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import(/* webpackChunkName: "auth" */ './views/Auth/Login.vue')
        },
        {
          path: 'reset',
          name: 'reset',
          component: () => import(/* webpackChunkName: "auth" */ './views/Auth/Reset.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import(/* webpackChunkName: "auth" */ './views/Auth/Register.vue')
        }
      ]
    },
  'default':
    // otherwise redirect to home
    { path: '*', redirect: '/login' }
};