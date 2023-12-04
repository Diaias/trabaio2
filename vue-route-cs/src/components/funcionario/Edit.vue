<template>
    <div id="tab_aut">
     
       <div v-if="currentFuncionario" class="edit-form">
            <h3>Funcionario</h3>
            <form>
                <div class="form-group">
                    <label for="inputnome">nome:</label>
                    <input type="text" v-model="currentFuncionario.nome" class="form-control" id="inputnome">
                </div>
                <div class="form-group">
                    <label for="inputendereco">endereco:</label>
                    <input type="text" v-model="currentFuncionario.endereco" class="form-control" id="inputendereco">
                </div>
                <div class="form-group">
                    <label for="inputemail">email:</label>
                    <input type="text" v-model="currentFuncionario.email" class="form-control" id="inputemail">
                </div>
                <div class="form-group">
                    <label for="inputcelular">celular:</label>
                    <input type="text" v-model="currentFuncionario.celular" class="form-control" id="inputcelular">
                </div>
                <div class="form-group">
                    <label for="inputsenha">senha:</label>
                    <input type="text" v-model="currentFuncionario.senha" class="form-control" id="inputsenha">
                </div>
                <div class="form-group">
                    <label for="inputfuncao">funçao:</label>
                    <input type="text" v-model="currentFuncionario.funcao" class="form-control" id="inputfuncao">
                </div>
                <div class="form-group">
                    <label for="inputcargo">cargo:</label>
                    <input type="text" v-model="currentFuncionario.cargo" class="form-control" id="inputcargo">
                </div>

            </form>
            <button class="badge badge-success" @click="updateFuncionario">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteFuncionario">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>

       </div>
       <div v-else>
            <br />
            <p>Please click on a Funcionario...</p>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import FuncionarioDataService from '../../services/FuncionarioDataService'
 
     export default{
      name:'editFuncionario',
      data() {
             return {                
                 currentFuncionario: null,
                 message: '',
             }
         },
         methods: {

            getFuncionario(cpf){

                FuncionarioDataService.get(cpf)
                .then(response => {
                    console.log(response.data);
                    this.currentFuncionario = response.data;
                    
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            updateFuncionario(){

                FuncionarioDataService.update(this.currentFuncionario)
                .then(response => {
                    console.log('FuncionarioDataService.update');
                    this.message = 'Funcionario alterado com sucesso !';
                    this.voltar();
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deleteFuncionario(){

                FuncionarioDataService.delete(this.currentFuncionario.cpf)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "funcionario-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "funcionario-list" });
            }
         },
         mounted() {
            
            this.message = '';
            this.getFuncionario(this.$route.params.cpf);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>