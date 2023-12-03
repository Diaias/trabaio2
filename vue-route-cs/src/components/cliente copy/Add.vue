<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="formcliente">
                <h3>Formulário para cadastro de Cliente</h3>
                <!--Input Nome-->
                <div class="errorInput" v-if="!$v.cliente.nome.required">Digite o nome: </div>
                <div class="form-group">
                    <label for="inputClienteNome">Nome:</label>
                    <input type="text" class="form__input" maxlength="30" v-on:keypress="testName($event)"
                        v-model.trim="$v.cliente.nome.$model" :class="status($v.cliente.nome)" id="inputClienteNome">
                </div>

                <!--Input CPF-->
                <div class="errorInput" v-if="!$v.cliente.cpf.required">Digite o CPF corretamente: </div>
                <div class="form-group">
                    <label for="inputClienteCPF">Digite o CPF: </label>
                    <input type="text" class="form__input" v-on:keypress="testNum($event)"
                        v-model.trim="$v.cliente.cpf.$model" :class="status($v.cliente.cpf)" id="inputClienteCPF"
                        onpaste="return false">
                </div>

                <!--Input Senha-->
                <div class="errorInput" v-if="!$v.cliente.senha.required">Senha deve ter no mínimo
                    {{ $v.cliente.senha.$params.minLength.min }} caracteres.</div>
                <div class="form-group">
                    <label for="inputClienteSenha">Senha:</label>
                    <input class="form__input" type="password" maxlength="10" v-on:keypress="testNum($event)"
                        placeholder="Digite 4 números" v-model="$v.cliente.senha.$model" :class="status($v.cliente.senha)"
                        id="inputClienteSenha">
                </div>

                <!-- Input Email -->
                <div class="errorInput" v-if="!$v.cliente.email.required">Digite o endereço de email:</div>
                <div class="form-group">
                    <label for="inputClienteEmail">Email:</label>
                    <input type="email" class="form__input" maxlength="50" v-model.trim="$v.cliente.email.$model"
                        :class="status($v.cliente.email)" id="inputClienteEmail">
                </div>

                <!-- Input Endereço -->
                <div class="errorInput" v-if="!$v.cliente.endereco.required">Digite o endereço: </div>
                <div class="form-group">
                    <label for="inputClienteEndereco">Endereço:</label>
                    <input type="text" class="form__input" maxlength="50" v-model.trim="$v.cliente.endereco.$model"
                        :class="status($v.cliente.endereco)" id="inputClienteEndereco">
                </div>

                <!-- Input Celular -->
                <div class="errorInput" v-if="!$v.cliente.numero_celular.required">Digite o número de celular:</div>
                <div class="form-group">
                    <label for="inputClienteCelular">Celular:</label>
                    <input type="tel" class="form__input" v-on:keypress="testNum($event)"
                        v-model.trim="$v.cliente.numero_celular.$model" :class="status($v.cliente.numero_celular)"
                        id="inputClienteCelular">
                </div>

                <button @click="saveCliente" class="btn btn-success">Salvar</button>
                <router-link to="/listclientes" class="btn btn-success">Voltar</router-link>
            </div>
        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newCliente">Novo</button>
            <router-link to="/listclientes" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.15.2/axios.js"></script>
<script src="https://unpkg.com/vuelidate@0.7.4/dist/vuelidate.min.js"></script>
<script src="https://unpkg.com/vuelidate@0.7.4/dist/validators.min.js"></script>
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
        Vue.use(window.vuelidate.default);
        const {
        required,
        minLength,
        minValue,
        between
        } = window.validators;
        Vue.prototype.$http = axios;
        
        validations: {
            cliente: {
                nome: {
                    required, 
                    minLength: minLength(2),
                },
                cpf:{
                    required,
                    minLength: minLength(14),
                },
                senha: {
                    required,
                    minLength: minLength(4)
                },
                numero_celular:{
                    required,
                },
                email:{
                    required,
                },
                endereco: {
                    required,
                },
            }
        },
        methods: {
            testName(e) {
                let char = String.fromCharCode(e.keyCode); // Get the character
                if(/^[a-zA-ZÁÉÍÓÚáéíóúÂÊÔâêôÀàÜüÇçÑñÃÕãõ ]+$/.test(char)){
                    return true; // Match with regex 
                }else{
                    e.preventDefault(); // If not match, don't add to input text
                }
            },
            testNum(e) {
                let char = String.fromCharCode(e.keyCode); // Get the character
                if(/^[0-9]+$/.test(char)){
                    return true; // Match with regex 
                }else{
                    e.preventDefault(); // If not match, don't add to input text
                }
            },
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
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.11/jquery.mask.min.js"></script>
<script type="text/javascript">
    $(document).ready(function() {
        $("#inputcliente_cpfPet").mask("000.000.000-00");
    });
</script>
<script type="text/javascript">
    $(document).ready(function() {
        $("#inputClienteCPF").mask("000.000.000-00");
    });
</script>
<script type="text/javascript">
    //Mascara para celular
    $(document).ready(function() {
    $("#inputClienteCelular").mask("(00)00000-0000");
    });
</script>
<script type="text/javascript">
    //Mascara para cep
    $(document).ready(function() {
        $("#inputClienteCEP").mask("00000-000");
    });
</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}

input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
}

.dirty {
    border-color: #5A5;
    background: #EFE;
}

.dirty:focus {
    outline-color: #8E8;
}

.errorInput {
    border-color: red;
    background: #FDD;
    width: 50%;
}

.error {
    border-color: red;
    background: #FDD;
}

.error:focus {
    outline-color: #F99;
}
</style>