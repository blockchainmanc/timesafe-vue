import Vue from 'vue'
import Router from 'vue-router'
import PariMutuel from '@/components/PariMutuel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PariMutuel',
      component: PariMutuel
    }
  ]
})
