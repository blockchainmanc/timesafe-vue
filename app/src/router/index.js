import Vue from 'vue'
import Router from 'vue-router'
import TimeSafe from '@/components/TimeSafe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TimeSafe',
      component: TimeSafe
    }
  ]
})
