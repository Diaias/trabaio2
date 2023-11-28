<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Equipamentos</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Descrição</th> 
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(e, indice) in equipamentos" :key ="e.id" :class="{ active: indice == currentIndex }">
                            <td>{{e.id}}</td>
                            <td>{{e.nome}}</td>
                            <td>{{e.marca}}</td>
                            <td>{{e.descricao}}</td>
               
                            <td><button v-on:click="setCurrentEquipamento(e, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remEquipamento(e, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentEquipamento">
                    <h4>Equipamento</h4>
                    <div>
                    <label><strong>Id:</strong></label> {{ currentEquipamento.id }}
                    </div>
                    <div>
                    <label><strong>Nome:</strong></label> {{ currentEquipamento.nome }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/updateequipamento/' + currentEquipamento.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Equipamento...</p>
                <router-link to="/addequipamento" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import EquipamentoDataService from '../../services/EquipamentoDataService'     
 
     export default{
      name:'listEquipamentos',
      data() {
             return {
                 equipamentos: [],
                 currentEquipamento: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarEquipamentos(){

                
                EquipamentoDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateEquipamento", response.status);

                   this.equipamentos = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listequipamento');
                    console.log(response);
                });
            },
            setCurrentEquipamento(equipamento, index){

                this.currentEquipamento = equipamento;
                this.currentIndex = index;
            },
            remEquipamento(equipamento, index){

                EquipamentoDataService.delete(equipamento.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarEquipamentos();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }
            
         },
         mounted() {
            this.listarEquipamentos();
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