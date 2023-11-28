import {Router} from 'express';
import ClienteController from './app/controllers/ClienteController';
import FuncionarioController from './app/controllers/FuncionarioController';
import ServicoController from './app/controllers/ServicoController';
import PecaController from './app/controllers/PecaController';
import EquipamentoController from './app/controllers/EquipamentoController';

const router = Router();

//Cliente
router.get('/listCliente', ClienteController.list);
router.post('/storeCliente/', ClienteController.store);
router.put('/updateCliente/:cpf', ClienteController.update);
router.delete('/deleteCliente/:cpf', ClienteController.delete);

router.post('/insertcliente/', ClienteController.store);
router.post('/logincliente', ClienteController.login);
router.get('/cliente/:cpf', ClienteController.find);
router.put('/updatecliente/:cpf', ClienteController.update);
router.delete('/deletecliente/:cpf', ClienteController.delete);


//Funcionario
router.get('/listFuncionario', FuncionarioController.list);
router.get('/findFuncionario/:cpf', FuncionarioController.find);
router.post('/storeFuncionario/', FuncionarioController.store);
router.put('/updateFuncionario/:cpf', FuncionarioController.update);
router.delete('/deleteFuncionario/:cpf', FuncionarioController.delete);
router.get('/findFuncionario/:cpf', FuncionarioController.find);

router.post('/insertfuncionario/', FuncionarioController.store);
router.post('/loginfuncionario', FuncionarioController.login);
router.get('/funcionario/:cpf', FuncionarioController.find);
router.put('/updatefuncionario/:cpf', FuncionarioController.update);
router.delete('/deletefuncionario/:cpf', FuncionarioController.delete);


//Servico
router.get('/listServico', ServicoController.list);
router.get('/findServico/:id', ServicoController.find);
router.post('/storeServico/', ServicoController.store);
router.put('/updateServico/:cpf', ServicoController.update);
router.delete('/deleteServico/:cpf', ServicoController.delete);

//Peca
router.get('/listPeca', PecaController.list);
router.post('/storePeca/', PecaController.store);
router.put('/updatePeca/:cpf', PecaController.update);
router.delete('/deletePeca/:cpf', PecaController.delete);

router.get('/listpeca', PecaController.find2);
router.post('/insertpeca/', PecaController.store);
router.get('/peca/:id', PecaController.find);
router.put('/updatepeca/:id', PecaController.update);
router.delete('/deletepeca/:id', PecaController.delete);

//Equipamento
router.get('/listEquipamento', EquipamentoController.list);
router.post('/storeEquipamento/', EquipamentoController.store);
router.put('/updateEquipamento/:cpf', EquipamentoController.update);
router.delete('/deleteEquipamento/:cpf', EquipamentoController.delete);

router.get('/listequipamento', EquipamentoController.list);
router.post('/insertEquipamento/', EquipamentoController.store);
router.get('/equipamento/:id', EquipamentoController.find);
router.put('/updateequipamento/:id', EquipamentoController.update);
router.delete('/deleteequipamento/:id', EquipamentoController.delete);

export default router;