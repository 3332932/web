import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../views/components/HelloWorld.vue'
import user from '../views/user/user.vue'
import role from '../views/role/role.vue'
import permission from '../views/permission/permission.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/role',
      name: 'role',
      component: role
    },
    {
      path: '/permission',
      name: 'permission',
      component: permission
    }
  ]
})
