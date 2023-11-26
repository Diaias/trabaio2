import Vue from 'vue'
import Router from 'vue-router'

import login from  '@/components/Login'
import home from  '@/components/Home'
import listJogadores from  '@/components/jogador/List'
import editJogador   from  '@/components/jogador/Edit'
import novoFuncionario   from  '@/components/funcionario/Add'
import listFuncionarios from  '@/components/funcionario/List'

import listPatentes from  '@/components/patente/List'

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
     {
      path: '/ListFuncionarios',
      name: 'funcionarios-list',
      component: listFuncionarios    
    },
    /* {
      path: '/funcionario/:cpf',
      name: "funcionario-edit",
      component: editFuncionario
    },  */
    {
      path: '/addfuncionario',
      name: "funcionario-add",
      component: novoFuncionario
    }

  ]
})

router.beforeEach((to, from, next) => {
    
  if (to.name !== 'login' && !localStorage.getItem('authUser')){
     next({name: 'login'})
  } else {
     next()
  }
  
})

export default router;