
import http from "../http-common";

class PecaDataService {

    async get(id){

        console.log('PecaDataService.get: ', id);
        return await http.get('/peca/'+id);
    }

    async list(){

        console.log('PecaDataService.list: ');
        return await http.get(`/listpeca`);
    }

    async delete(id){

        console.log('PecaDataService.delete: ', id);
        return await http.delete(`/deletepeca/`+id);
    }

    async update(data){

        console.log('PecaDataService.update: ', data);
        return await http.put(`/updatepeca/:id`, data);
    }
    
    async create(data){

        console.log('PecaDataService.create: ', data);
        return await http.post(`/insertpeca/`, data);

    }  

}

export default new PecaDataService();
