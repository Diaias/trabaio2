<template>
    <div id="tab_aut">
     
       <div v-if="currentEquipamento" class="edit-form">
            <h3>Equipamento</h3>
            <form>
                <div class="form-group">
                    <label for="inputid">Id:</label>
                    <input type="text" v-model="currentEquipamento.id" class="form-control" id="inputid" disabled>
                </div>
                <div class="form-group">
                    <label for="inputNome">Nome:</label>
                    <input type="text" v-model="currentEquipamento.nome" class="form-control" id="inputNome">
                </div>
                <div class="form-group">
                        <label for="inputMarca">Marca:</label>
                        <input type="text" v-model="currentEquipamento.marca" class="form-control" id="inputMarca" >
                </div>
                <div class="form-group">
                    <label for="inputDescricao">Descrição:</label>
                    <input type="text" v-model="currentEquipamento.descricao" class="form-control" id="inputDescricao" >
                </div>
                <div class="form-group">
                    <label for="selectPeca">Pecas:</label>
                    <select v-model="currentEquipamento.pecas" class="form-control" id="selectPeca" multiple>                                
                        <option v-for="p in pecas" :key ="p.id" v-bind:value="p">
                            {{ p.nome }}
                            </option>
                    </select>
                    
                </div>                        
            </form>
            <button class="badge badge-success" @click="updateEquipamento">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteEquipamento">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>

       </div>
       <div v-else>
            <br />
            <p>Please click on a Equipamento...</p>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import EquipamentoDataService from '../../services/EquipamentoDataService'
     import PecaDataService from '../../services/PecaDataService'
 
     export default{
      name:'editEquipamentos',
      data() {
             return {                
                 currentEquipamento: null,
                 message: '',
                 pecas: []
             }
         },
         methods: {

            getEquipamento(id){

                EquipamentoDataService.get(id)
                .then(response => {
                    
                    console.log(response.data);

                    this.currentEquipamento = response.data;
                    
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            listPecas(){

                PecaDataService.list().then(response =>{

                    console.log("Retorno do seviço PecaDataService.list", response.status);
                    console.log(response.data)
                    this.pecas = response.data;                                  

                }).catch(response => {

                // error callback
                alert('Não conectou no serviço PecaDataService.list');
                console.log(response);
                });               
            },
            updateEquipamento(){

                EquipamentoDataService.update(this.currentEquipamento)
                .then(response => {
                    console.log('EquipamentoDataService.update');
                    this.message = 'Equipamento alterado com sucesso !';
                    this.voltar();
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deleteEquipamento(){

                EquipamentoDataService.delete(this.currentEquipamento.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "equipamento-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "equipamento-list" });
            }
         },
         mounted() {
            
            this.message = '';
            this.listPecas();
            this.getEquipamento(this.$route.params.id);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>