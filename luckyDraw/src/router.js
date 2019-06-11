import Vue from 'vue'
import Router from 'vue-router'
import LuckyDraw from './views/LuckyDraw.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'LuckyDraw',
      component: LuckyDraw
    },
    {
      path: '/other',
      name: 'other',
      // route level code-splitting
      // this generates a separate chunk (Other.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "Other" */ './views/Other.vue')
    }
  ]
})
