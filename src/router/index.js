import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'RouterView',
    component: () =>import( '@/views/RouterView.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>import( '@/components/HomeIndex.vue')
      },
      {
        path: '/app',
        name: 'Campo',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>import( '@/components/campo/MapaCampo.vue')
      },
      {  
        path: '/app/add',
        name: 'Criar Ponto',    
        component: () => import( '@/components/campo/CriarPonto.vue'),
        children: [
          {
            path: ':id',
            component: () => import( '@/components/campo/CriarPonto.vue')
          },
        ],
      },
      {  
        path: '/meusPontos',
        name: 'Meus Pontos',    
        component: () => import( '@/components/meus-pontos/MeusPontos.vue'),
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>import( '@/views/Login.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path != '/login' && to.path != '/'){
    if(window.sessionStorage.getItem('auth'))
      next()
    else
      window.location.assign('/login')
  }
  next()
})

export default router
