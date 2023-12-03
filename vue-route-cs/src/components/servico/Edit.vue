<template>
    <div id="tab_aut">

        <div v-if="currentServico" class="edit-form">
            <h3>Servico</h3>
            <form>
                <div class="form-group">
                    <label for="inputNome">Nome:</label>
                    <input type="text" v-model="currentServico.nome" class="form-control" id="inputNome">
                </div>
                <div class="form-group">
                    <label for="inputDescricao">Descrição:</label>
                    <input type="text" v-model="currentServico.descricao" class="form-control" id="inputDescricao">
                </div>
                <div class="form-group">
                <label for="inputOrcamento">Orcamento:</label>
                <input type="text" v-model="currentServico.orcamento" class="form-control" id="inputOrcamento">
            </div>

            <!--Select Cliente-->
            <div class="form-group">
                <label for="selectCliente">Clientes:</label>
                <select v-model="currentServico.cliente" class="form-control" id="selectCliente" >
                    <option v-for="c in cliente" :key="c.cpf" v-bind:value="c">
                        {{ c.nome }}
                    </option>
                </select>
            </div>

            <!--Select Funcionario-->
            <div class="form-group">
                <label for="selectFuncionario">Funcionarios:</label>
                <select v-model="currentServico.funcionario" class="form-control" id="selectFuncionario" >
                    <option v-for="f in funcionario" :key="f.cpf" v-bind:value="f">
                        {{ f.nome }}
                    </option>
                </select>
            </div>

            <!--Select Equipamento-->
            <div class="form-group">
                <label for="selectEquipamento">Equipamentos:</label>
                <select v-model="currentServico.equipamento" class="form-control" id="selectEquipamento" multiple>
                    <option v-for="e in equipamento" :key="e.id" v-bind:value="e">
                        {{ e.nome }}
                    </option>
                </select>
            </div>
            </form>
            <button class="badge badge-success" @click="updateServico">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteServico">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>


            <p>{{ message }}</p>

        </div>
        <div v-else>
            <br />
            <p>Please click on a Servico...</p>
        </div>


    </div>
</template>
<script>

import ServicoDataService from '../../services/ServicoDataService'
import ClienteDataService from '../../services/ClienteDataService'
import FuncionarioDataService from '../../services/FuncionarioDataService'
import EquipamentoDataService from '../../services/EquipamentoDataService'

export default {
    name: 'editServicos',
    data() {
        return {
            currentServico: null,
            message: '',
            equipamento: []
        }
    },
    methods: {
        getServico(id) {
            ServicoDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentServico = response.data;
                    console.log(this.currentServico)
                })
                .catch(e => {
                    console.log(e);
                })
        },

        //List cliente
        listCliente() {
            ClienteDataService.list().then(response => {
                console.log("Retorno do seviço ClienteDataService.list", response.status);
                for (let e of response.data) {
                    this.cliente.push(e);
                }
            }).catch(response => {
                // error callback
                alert('Não conectou no serviço ClienteDataService.list');
                console.log(response);
            });
        },
        //List funcionario
        listFuncionario() {
            FuncionarioDataService.list().then(response => {
                console.log("Retorno do seviço FuncionarioDataService.list", response.status);
                for (let e of response.data) {
                    this.funcionario.push(e);
                }
            }).catch(response => {
                // error callback
                alert('Não conectou no serviço FuncionarioDataService.list');
                console.log(response);
            });
        },
        //List equipamento
        listEquipamento() {
            EquipamentoDataService.list().then(response => {
                console.log("Retorno do seviço EquipamentoDataService.list", response.status);
                for (let e of response.data) {
                    this.equipamento.push(e);
                }
            }).catch(response => {
                // error callback
                alert('Não conectou no serviço EquipamentoDataService.list');
                console.log(response);
            });
        },

        updateServico() {

            ServicoDataService.update(this.currentServico)
                .then(response => {
                    console.log('ServicoDataService.update');
                    this.message = 'Servico alterado com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },
        deleteServico() {

            ServicoDataService.delete(this.currentServico.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "servico-list" });
                })
                .catch(e => {
                    console.log(e);
                });
        },
        voltar() {
            this.$router.push({ name: "servico-list" });
        }
    },
    mounted() {

        this.message = '';
        this.listCliente();
        this.listFuncionario();
        this.listEquipamento();
        this.getServico(this.$route.params.id);
        console.log(this.currentServico)
    }
}
</script>
    
<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>