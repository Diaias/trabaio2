
import http from "../http-common";

class ServicoDataService {

    async get(id){

        console.log('ServicoDataService.get: ', id);
        return await http.get('/servico/'+id);
    }

    async list(){

        console.log('ServicoDataService.list: ');
        return await http.get(`/listservico`);
    }

    async find(){

        console.log('ServicoDataService.find: ');
        return await http.get(`/findservico`);
    }

    async delete(id){

        console.log('ServicoDataService.delete: ', id);
        return await http.delete(`/deleteservico/`+id);
    }

    async update(data){

        console.log('ServicoDataService.update: ', data);
        return await http.put(`/updateservico/:id`, data);
    }
    
    async create(data){

        console.log('ServicoDataService.create: ', data);
        return await http.post(`/storeServico`, data);

    }  

}

export default new ServicoDataService();
