
import http from "../http-common";

class EquipamentoDataService {

    async get(id){

        console.log('EquipamentoDataService.get: ', id);
        return await http.get('/equipamento/'+id);
    }

    async list(){

        console.log('EquipamentoDataService.list: ');
        return await http.get(`/listequipamento`);
    }

    async delete(id){

        console.log('EquipamentoDataService.delete: ', id);
        return await http.delete(`/deleteequipamento/`+id);
    }

    async update(data){

        console.log('EquipamentoDataService.update: ', data);
        return await http.put(`/updateequipamento/:id`, data);
    }
    
    async create(data){

        console.log('EquipamentoDataService.create: ', data);
        return await http.post(`/storeEquipamento/`, data);

    }  

}

export default new EquipamentoDataService();
