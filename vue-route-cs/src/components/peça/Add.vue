<template>
    <div class="submit-form">
      <div v-if="!submitted">       

        <div class="form-group">
            <label for="inputNome">Nome:</label>
            <input type="text" v-model="peca.nome" class="form-control" id="inputNome">
        </div> 
        <div class="form-group">
                <label for="inputmarca">Marca:</label>
                <input type="text" v-model="peca.marca" class="form-control" id="inputmarca">
        </div>
        <div class="form-group">
            <label for="inputpreco">Preço:</label>
            <input type="number" v-model="peca.preco" class="form-control" id="inputpreco">
        </div>
  
        <button @click="savePeca" class="btn btn-success">Salvar</button>
        <router-link to="/pecas" class="btn btn-success">Voltar</router-link>                 

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newPeca">Novo</button>
        <router-link to="/pecas" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import PecaDataService from '../../services/PecaDataService'

    export default {
        name: "addPeca",
        data(){
            return {
                peca: {indice: '', 
                                    nome: '',
                                    marca: "", 
                                    preco: ""                                                                 
                                },
                submitted: false,
            }            
        },
        methods: {

            savePeca(){

                var pec = jQuery.extend({}, this.peca);//clona o this.novo_jogador e armazena na variavel jogador. dessa forma alteracoes em this.novo_jogador nao irao refletir em jogador.                                                                   

                if (pec.nome.trim().length > 0 && 
                    pec.marca.trim().length > 0 && pec.preco.trim().length > 0 ) {
                
                    PecaDataService.create(pec)
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
            newPeca(){

                this.submitted = false;
                this.peca = {};
            },
        },
        mounted() {
   
        }


    }

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>