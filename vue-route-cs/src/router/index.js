import Vue from 'vue'
import Router from 'vue-router'

import login from  '@/components/Login'
import home from  '@/components/Home'

import novoFuncionario   from  '@/components/funcionario/Add'
import listFuncionarios from  '@/components/funcionario/List'
import editFuncionario   from  '@/components/funcionario/Edit'


import novoPeca   from  '@/components/peça/Add'
import listPecas from  '@/components/peça/List'
import editPeca   from  '@/components/peça/Edit'

import novoCliente   from  '@/components/cliente/Add'
import listClientes from  '@/components/cliente/List'
import editCliente   from  '@/components/cliente/Edit'


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
    {
      path: '/updatefuncionario/:cpf',
      name: "funcionario-edit",
      component: editFuncionario
    }, 
    {
      path: '/addfuncionario',
      name: "funcionario-add",
      component: novoFuncionario
    },
    {
      path: '/listPecas',
      name: 'pecas-list',
      component: listPecas    
    },
    {
      path: '/updatepeca/:id',
      name: "peca-edit",
      component: editPeca
    }, 
    {
      path: '/addpeca',
      name: "peca-add",
      component: novoPeca
    },
    {
      path: '/ListClientes',
      name: 'clientes-list',
      component: listClientes   
    },
    {
      path: '/updatecliente/:cpf',
      name: "cliente-edit",
      component: editCliente
    }, 
    {
      path: '/addcliente',
      name: "cliente-add",
      component: novoCliente
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