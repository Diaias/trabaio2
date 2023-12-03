<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <h4>Adição de Servicos</h4>
            <div class="form-group">
                <label for="inputSenha">Nome:</label>
                <input type="text" v-model="servico.nome" class="form-control" id="inputSenha">
            </div>
            <div class="form-group">
                <label for="inputDescricao">Descrição:</label>
                <input type="text" v-model="servico.descricao" class="form-control" id="inputDescricao">
            </div>
            
            <div class="form-group">
                <label for="inputOrcamento">Orcamento:</label>
                <input type="text" v-model="servico.orcamento" class="form-control" id="inputOrcamento">
            </div>

            <!--Select Cliente-->
            <div class="form-group">
                <label for="selectCliente">Clientes:</label>
                <select v-model="servico.cliente" class="form-control" id="selectCliente" multiple>
                    <option v-for="c in cliente" :key="c.cpf" v-bind:value="c">
                        {{ c.nome }}
                    </option>
                </select>
            </div>

            <!--Select Funcionario-->
            <div class="form-group">
                <label for="selectFuncionario">Funcionarios:</label>
                <select v-model="servico.funcionario" class="form-control" id="selectFuncionario" multiple>
                    <option v-for="f in funcionario" :key="f.cpf" v-bind:value="f">
                        {{ f.nome }}
                    </option>
                </select>
            </div>

            <!--Select Equipamento-->
            <div class="form-group">
                <label for="selectEquipamento">Equipamentos:</label>
                <select v-model="servico.equipamento" class="form-control" id="selectEquipamento" multiple>
                    <option v-for="e in equipamento" :key="e.id" v-bind:value="e">
                        {{ e.nome }}
                    </option>
                </select>
            </div>

            <button @click="saveServico" class="btn btn-success">Salvar</button>
            <router-link to="/listServicos" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newServico">Novo</button>
            <router-link to="/listServicos" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>

import ServicoDataService from '../../services/ServicoDataService'
import ClienteDataService from '../../services/ClienteDataService'
import FuncionarioDataService from '../../services/FuncionarioDataService'
import EquipamentoDataService from '../../services/EquipamentoDataService'

export default {
    name: "addServico",
    data() {
        return {
            servico: {
                indice: '',
                nome: '',
                descricao: "",
                orcamento: "",
                cliente: [],
                funcionario: [],
                equipamento: []
            },
            submitted: false,
            cliente: [],
            funcionario: [],
            equipamento: []
        }
    },
    methods: {

        saveServico() {

            var servico = jQuery.extend({}, this.servico);//clona o this.novo_servico e armazena na variavel servico. dessa forma alteracoes em this.novo_servico nao irao refletir em servico.
            var cli = jQuery.extend({}, this.servico.cliente);//clona o this.novo_servico.peca                   
            var func = jQuery.extend({}, this.servico.funcionario);//clona o this.novo_servico.peca
            var equi = jQuery.extend({}, this.servico.equipamento);//clona o this.novo_servico.peca

            servico.cliente.id = cli;
            servico.funcionario.cpf = func;
            servico.equipamento.cpf = equi;

            console.log(pec)

            if (servico.nome.trim().length > 0 &&
                servico.descricao.trim().length > 0) {

                ServicoDataService.create(servico)
                    .then(response => {

                        this.submitted = true;
                    })
                    .catch(e => {
                        alert("Erro ao tentar cadastrar. !!! " + e.message);

                    })

            } else {
                alert('Formulário incompleto !!!');
            }

        },
        newServico() {
            this.submitted = false;
            this.servico = {};
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
        }

    },
    mounted() {
        this.listCliente();
        this.listFuncionario();
        this.listEquipamento();
    }

}

</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}</style>