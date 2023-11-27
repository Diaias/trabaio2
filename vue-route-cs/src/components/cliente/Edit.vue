<template>
    <div id="tab_aut">
     
       <div v-if="currentCliente" class="edit-form">
            <h3>Cliente</h3>
            <form>
                <div class="form-group">
                    <label for="inputnome">nome:</label>
                    <input type="text" v-model="currentCliente.nome" class="form-control" id="inputnome">
                </div>
                <div class="form-group">
                    <label for="inputendereco">endereco:</label>
                    <input type="text" v-model="currentCliente.endereco" class="form-control" id="inputendereco">
                </div>
                <div class="form-group">
                    <label for="inputemail">email:</label>
                    <input type="text" v-model="currentCliente.email" class="form-control" id="inputemail">
                </div>
                <div class="form-group">
                    <label for="inputcelular">celular:</label>
                    <input type="text" v-model="currentCliente.celular" class="form-control" id="inputcelular">
                </div>
                <div class="form-group">
                    <label for="inputsenha">senha:</label>
                    <input type="text" v-model="currentCliente.senha" class="form-control" id="inputsenha">
                </div>

            </form>
            <button class="badge badge-success" @click="updateCliente">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteCliente">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>

       </div>
       <div v-else>
            <br />
            <p>Please click on a Cliente...</p>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import ClienteDataService from '../../services/ClienteDataService'
 
     export default{
      name:'editCliente',
      data() {
             return {                
                 currentCliente: null,
                 message: '',
             }
         },
         methods: {

            getCliente(cpf){

                ClienteDataService.get(cpf)
                .then(response => {
                    console.log(response.data);
                    this.currentCliente = response.data;
                    
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            updateCliente(){

                ClienteDataService.update(this.currentCliente)
                .then(response => {
                    console.log('ClienteDataService.update');
                    this.message = 'Cliente alterado com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deleteCliente(){

                ClienteDataService.delete(this.currentCliente.cpf)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "cliente-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "cliente-list" });
            }
         },
         mounted() {
            
            this.message = '';
            this.getCliente(this.$route.params.cpf);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>