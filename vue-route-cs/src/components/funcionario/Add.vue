<template>
    <div class="submit-form">
      <div v-if="!submitted">       

        <div class="form-group">
            <label for="inputNome">nome:</label>
            <input type="text" v-model="funcionario.nome" class="form-control" id="inputNome">
        </div>  
        <div class="form-group">
            <label for="inputcpf">cpf:</label>
            <input type="text" v-model="funcionario.cpf" class="form-control" id="inputcpf">
        </div> 
        <div class="form-group">
                <label for="inputendereco">endereco:</label>
                <input type="text" v-model="funcionario.endereco" class="form-control" id="inputendereco">
        </div>
        <div class="form-group">
            <label for="inputemail">email:</label>
            <input type="text" v-model="funcionario.email" class="form-control" id="inputemail">
        </div>
        <div class="form-group">
            <label for="inputcelular">celular:</label>
            <input type="text" v-model="funcionario.celular" class="form-control" id="inputcelular">
        </div>
        <div class="form-group">
            <label for="inputsenha">senha:</label>
            <input type="text" v-model="funcionario.senha" class="form-control" id="inputsenha">
        </div>
        <div class="form-group">
            <label for="inputfuncao">funçao:</label>
            <input type="text" v-model="funcionario.funcao" class="form-control" id="inputfuncao">
        </div>
        <div class="form-group">
            <label for="inputcargo">cargo:</label>
            <input type="text" v-model="funcionario.cargo" class="form-control" id="inputcargo">
        </div>
  
        <button @click="saveFuncionario" class="btn btn-success">Salvar</button>
        <router-link to="/listfuncionarios" class="btn btn-success">Voltar</router-link>                 

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newFuncionario">Novo</button>
        <router-link to="/listfuncionarios" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import FuncionarioDataService from '../../services/FuncionarioDataService'

    export default {
        name: "addFuncionario",
        data(){
            return {
                funcionario: {indice: '', 
                                    cpf: '', 
                                    nome: '',
                                    endereco: "", 
                                    email: "",                                                                        
                                    celular: "",  
                                    senha: "",
                                    funcao: "",
                                    cargo: ""
                                },
                submitted: false,
            }            
        },
        methods: {

            saveFuncionario(){

                var func = jQuery.extend({}, this.funcionario);//clona o this.novo_jogador e armazena na variavel jogador. dessa forma alteracoes em this.novo_jogador nao irao refletir em jogador.                                                                   

                if (func.nome.trim().length > 0 && func.cpf.trim().length > 0 && 
                    func.endereco.trim().length > 0 && func.email.trim().length > 0 &&
                    func.celular.trim().length > 0 && func.senha.trim().length > 0 &&
                    func.funcao.trim().length > 0 && func.cargo.trim().length > 0) {
                
                    FuncionarioDataService.create(func)
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
            newFuncionario(){

                this.submitted = false;
                this.funcionario = {};
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