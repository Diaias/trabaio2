<template>
    <div class="submit-form">
      <div v-if="!submitted">       

        <div class="form-group">
            <label for="inputNome">nome:</label>
            <input type="text" v-model="cliente.nome" class="form-control" id="inputNome">
        </div>  
        <div class="form-group">
            <label for="inputcpf">cpf:</label>
            <input type="text" v-model="cliente.cpf" class="form-control" id="inputcpf">
        </div> 
        <div class="form-group">
                <label for="inputendereco">endereco:</label>
                <input type="text" v-model="cliente.endereco" class="form-control" id="inputendereco">
        </div>
        <div class="form-group">
            <label for="inputemail">email:</label>
            <input type="text" v-model="cliente.email" class="form-control" id="inputemail">
        </div>
        <div class="form-group">
            <label for="inputcelular">celular:</label>
            <input type="text" v-model="cliente.celular" class="form-control" id="inputcelular">
        </div>
        <div class="form-group">
            <label for="inputsenha">senha:</label>
            <input type="password" v-model="cliente.senha" class="form-control" id="inputsenha">
        </div>

        <button @click="saveCliente" class="btn btn-success">Salvar</button>
        <router-link to="/listclientes" class="btn btn-success">Voltar</router-link>                 

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newCliente">Novo</button>
        <router-link to="/listclientes" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import ClienteDataService from '../../services/ClienteDataService'

    export default {
        name: "addCliente",
        data(){
            return {
                cliente: {indice: '', 
                                    cpf: '', 
                                    nome: '',
                                    endereco: "", 
                                    email: "",                                                                        
                                    celular: "",  
                                    senha: ""
                                },
                submitted: false,
            }            
        },
        methods: {

            saveCliente(){

                var func = jQuery.extend({}, this.cliente);//clona o this.novo_jogador e armazena na variavel jogador. dessa forma alteracoes em this.novo_jogador nao irao refletir em jogador.                                                                   

                if (func.nome.trim().length > 0 && func.cpf.trim().length > 0 && 
                    func.endereco.trim().length > 0 && func.email.trim().length > 0 &&
                    func.celular.trim().length > 0 && func.senha.trim().length > 0 ) {
                
                    ClienteDataService.create(func)
                    .then(response => {
                        
                        this.submitted = true;
                    })
                    .catch(e => {                        
                        alert("Erro ao tentar cadastrar. !!! " + e.message);

                    })

                }else{
                    alert('Formulário incompleto !!!');
                }

            },
            newCliente(){

                this.submitted = false;
                this.cliente = {};
            },
        },

    }

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>