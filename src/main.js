import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//import vue router
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'
import './assets/styles/main.css'
//import component
import AppointmentIndex from './components/appointment/Appointment'
import AppointmentCreate from './components/appointment/Create'
import AppointmentEdit from './components/appointment/Edit'
import AppointmentDetail from './components/appointment/Detail'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: '/login',
      component: Login
    },
    {
      path: '/',
      name: '/register',
      component: Register
    },
    {
      path: '/appointment',
      name: '/appointment',
      component: AppointmentIndex
    },
    {
      path: '/create',
      name: '/create',
      component: AppointmentCreate
    },
    {
      path: '/edit/:id',
      name: '/edit',
      component: AppointmentEdit
    },
    {
      path: '/detail/:id',
      name: '/detail',
      component: AppointmentDetail
    }
  ],
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')