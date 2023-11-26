<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Funcionarios</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Cpf</th>
                    <th scope="col">Endereço</th> 
                    <th scope="col">Email</th>
                    <th scope="col">Celular</th>  
                    <th scope="col">Funçao</th> 
                    <th scope="col">Cargo</th> 
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(f, indice) in funcionarios" :key ="f.cpf" :class="{ active: indice == currentIndex }">
                            <td>{{f.nome}}</td>
                            <td>{{f.cpf}}</td>
                            <td>{{f.endereco}}</td>
                            <td>{{f.email}}</td>
                            <td>{{f.celular}}</td>
                            <td>{{f.funcao}}</td>         
                            <td>{{f.cargo}}</td>      
                            <td><button v-on:click="setCurrentFuncionario(f, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remFuncionario(f, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentFuncionario">
                    <h4>Funcionario</h4>
                    <div>
                    <label><strong>Cpf:</strong></label> {{ currentFuncionario.cpf }}
                    </div>
                    <div>
                    <label><strong>Nome:</strong></label> {{ currentFuncionario.nome }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/updatefuncionario/' + currentFuncionario.cpf"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Clique em um Funcionario...</p>
                <router-link to="/addfuncionario" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import FuncionarioDataService from '../../services/FuncionarioDataService'     
 
     export default{
      name:'listFuncionarios',
      data() {
             return {
                 funcionarios: [],
                 currentFuncionario: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarFuncionarios(){

                
                FuncionarioDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateFuncionario", response.status);

                   this.funcionarios = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listfuncionario');
                    console.log(response);
                });
            },
            setCurrentFuncionario(funcionario, index){

                this.currentFuncionario = funcionario;
                this.currentIndex = index;
            },
            remFuncionario(funcionario, index){

                FuncionarioDataService.delete(funcionario.cpf)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarFuncionarios();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }
            
         },
         mounted() {
            this.listarFuncionarios();
         }
 
     }
 </script>
    
 <style scoped>

    .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
    }

     
 </style>