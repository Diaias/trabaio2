
import http from "../http-common";

class ClienteDataService {

    /*
    async authenticate(data){

        console.log('ClienteDataService.authenticate: ', data);
        const response = await http.post(`/logincliente`, data);
        return response;
    }*/

    async get(cpf){

        console.log('ClienteDataService.get: ', cpf);
        return await http.get('/cliente/'+cpf);
    }

    async list(){

        console.log('ClienteDataService.list: ');
        return await http.get(`/Listclientes`);
    }

    async delete(cpf){

        console.log('ClienteDataService.delete: ', cpf);
        return await http.delete(`/deletecliente/`+cpf);
    }

    async update(data){

        console.log('ClienteDataService.update: ', data);
        return await http.put(`/updatecliente/:cpf`, data);
    }
    
    async create(data){

        console.log('ClienteDataService.create: ', data);
        return await http.post(`/insertcliente/`, data);

    }  

}

export default new ClienteDataService();
