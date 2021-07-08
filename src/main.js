import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

import AppointmentIndex from './components/appointment/Index'
import AppointmentCreate from './components/appointment/Create'
import AppointmentEdit from './components/appointment/Edit'

import AuthLogin from './components/auth/Login'
import AuthRegister from './components/auth/Register'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'login',
      component: AuthLogin
    },
    {
      path: '/register',
      name: 'register',
      component: AuthRegister
    },
    {
      path: '/appointment/create',
      name: 'create',
      component: AppointmentCreate
    },
    {
      path: '/appointment/edit/:id',
      name: 'edit',
      component: AppointmentEdit
    },
    {
      path: '/appointment',
      name: 'appointment',
      component: AppointmentIndex
    },
  ],
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
