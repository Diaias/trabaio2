<template>
    <div class="submit-form">
      <div v-if="!submitted">       

        <div class="form-group">
            <label for="inputSenha">Nome:</label>
            <input type="text" v-model="equipamento.nome" class="form-control" id="inputSenha">
        </div>            
        <div class="form-group">
                <label for="inputMarca">Marca:</label>
                <input type="text" v-model="equipamento.marca" class="form-control" id="inputmarca">
        </div>
        <div class="form-group">
            <label for="inputDescricao">Descrição:</label>
            <input type="text" v-model="equipamento.descricao" class="form-control" id="inputDescricao">
        </div>
        <div class="form-group">
            <label for="selectPeca">Peças:</label>
            <select v-model="equipamento.pecas" class="form-control" id="selectPeca" multiple>                                
                <option v-for="p in pecas" :key ="p.id" v-bind:value="p">
                    {{ p.nome }}
                    </option>
            </select>
            
        </div>     
  
        <button @click="saveEquipamento" class="btn btn-success">Salvar</button>
        <router-link to="/listEquipamentos" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newEquipamento">Novo</button>
        <router-link to="/listEquipamentos" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import EquipamentoDataService from '../../services/EquipamentoDataService'
    import PecaDataService from '../../services/PecaDataService'

    export default {
        name: "addEquipamento",
        data(){
            return {
                equipamento: {indice: '',  
                                    nome: '',
                                    marca: "", 
                                    descricao: "",                                                                        
                                    pecas: []},
                submitted: false,
                pecas: []
            }            
        },
        methods: {

            saveEquipamento(){

                var equip = jQuery.extend({}, this.equipamento);//clona o this.novo_equipamento e armazena na variavel equipamento. dessa forma alteracoes em this.novo_equipamento nao irao refletir em equipamento.
                var pec = jQuery.extend({}, this.equipamento.pecas);//clona o this.novo_equipamento.peca                        
                equip.pecas.id = pec;                                                
                
                console.log(pec)

                if (    equip.nome.trim().length > 0 && 
                        equip.marca.trim().length > 0 && 
                        equip.descricao.trim().length > 0 ) {
                
                    EquipamentoDataService.create(equip)
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
            newEquipamento(){

                this.submitted = false;
                this.equipamento = {};
            },
            listPecas(){

                PecaDataService.list().then(response =>{

                console.log("Retorno do seviço PecaDataService.list", response.status);

                for(let e of response.data){

                    this.pecas.push(e);
                }                  

                }).catch(response => {

                // error callback
                alert('Não conectou no serviço PecaDataService.list');
                console.log(response);
                });               
            }

        },
        mounted() {                        
            this.listPecas();

         }

    }

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>