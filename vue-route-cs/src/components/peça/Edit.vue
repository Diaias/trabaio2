<template>
    <div id="tab_aut">
     
       <div v-if="currentPeca" class="edit-form">
            <h3>Peca</h3>
            <form>
                <div class="form-group">
                    <label for="inputid">Id:</label>
                    <input type="text" v-model="currentPeca.id" class="form-control" id="inputid" disabled>
                </div>
                <div class="form-group">
                    <label for="inputnome">Mome:</label>
                    <input type="text" v-model="currentPeca.nome" class="form-control" id="inputnome">
                </div>
                <div class="form-group">
                    <label for="inputmarca">Marca:</label>
                    <input type="text" v-model="currentPeca.marca" class="form-control" id="inputmarca">
                </div>
                <div class="form-group">
                    <label for="inputpreco">Preco:</label>
                    <input type="number" v-model="currentPeca.preco" class="form-control" id="inputpreco">
                </div>

            </form>
            <button class="badge badge-success" @click="updatePeca">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deletePeca">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>

       </div>
       <div v-else>
            <br />
            <p>Please click on a Peca...</p>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import PecaDataService from '../../services/PecaDataService'
 
     export default{
      name:'editPeca',
      data() {
             return {                
                 currentPeca: null,
                 message: '',
             }
         },
         methods: {

            getPeca(id){

                PecaDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentPeca = response.data;
                    
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            updatePeca(){

                PecaDataService.update(this.currentPeca)
                .then(response => {
                    console.log('PecaDataService.update');
                    this.message = 'Peca alterado com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deletePeca(){

                PecaDataService.delete(this.currentPeca.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "peca-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "peca-list" });
            }
         },
         mounted() {
            
            this.message = '';
            this.getPeca(this.$route.params.id);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>