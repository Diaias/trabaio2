<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Servicos</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Descrição</th> 
                    <th scope="col">Orçamento</th> 
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(s, indice) in servico" :key ="s.id" :class="{ active: indice == currentIndex }">
                            <td>{{s.id}}</td>
                            <td>{{s.nome}}</td>
                            <td>{{s.descricao}}</td>
                            <td>{{s.orcamento}}</td>
                            <td>{{s.data_pedido | formataData}}</td>
               
                            <td><button v-on:click="setCurrentServico(s, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remServico(s, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentServico">
                    <h4>Servico</h4>
                    <div>
                    <label><strong>Id:</strong></label> {{ currentServico.id }}
                    </div>
                    <div>
                    <label><strong>Nome:</strong></label> {{ currentServico.nome }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/updateservico/' + currentServico.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Servico...</p>
                <router-link to="/addservico" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import ServicoDataService from '../../services/ServicoDataService'     
 
     export default{
      name:'listServicos',
      data() {
             return {
                 servico: [],
                 currentServico: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarServicos(){

                
                ServicoDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateServico", response.status);

                   this.servico = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listservico');
                    console.log(response);
                });
            },
            setCurrentServico(servico, index){
                this.currentServico = servico;
                this.currentIndex = index;
            },
            remServico(servico, index){

                ServicoDataService.delete(servico.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarServicos();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }
            
         },
         mounted() {
            this.listarServicos();
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