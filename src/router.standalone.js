import Vue from 'vue'
import Router from 'vue-router'

import { store } from './_store'
import { cbadminRoutes } from './router'

Vue.use(Router)

var applicationRoutes = [];

applicationRoutes.push(cbadminRoutes['default']);
applicationRoutes.push(cbadminRoutes['authentication']);
applicationRoutes.push(cbadminRoutes['user']);
applicationRoutes.push(cbadminRoutes['role']);
applicationRoutes.push(cbadminRoutes['permission']);
applicationRoutes.push(cbadminRoutes['permissiongroup']);

cbadminRoutes['dashboard'].children.push(
  {
    path: '/dashboard',
    redirect: '/user/list'
  }
);
applicationRoutes.push(cbadminRoutes['dashboard']);

export const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: applicationRoutes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register', '/reset'];
  const authRequired = !publicPages.includes(to.path);
  const loggedUser = store.state.user.userId;

  if (authRequired && (!loggedUser)) {
    return next('/login');
  }

  next();
});