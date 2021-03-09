import Home from './Pages/Home.vue'
import Login from './Pages/Login.vue'



const ifAuth = (to, from, next) => {
    if (1==1) {
      next()
      return
    }
    next('/admin/login')
  }

  const ifNotAuth = (to, from, next) => {
    if (1!=1) {
      next()
      return
    }
    next('/admin')
  }


export const routes = [
    {
        path:'/admin',
        component:Home,
        beforeEnter: ifAuth,
    },
    {
        path:'/admin/login',
        component:Login,
        beforeEnter: ifNotAuth,
    },

];