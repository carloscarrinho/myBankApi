import express from 'express';
const routes = express.Router();

import AccountController from './controllers/AccountController.js';

routes.get('/', AccountController.index);
routes.post('/depositar', AccountController.deposit);
routes.post('/sacar', AccountController.withdraw);
routes.post('/consultar-saldo', AccountController.read);
routes.post('/deletar-conta', AccountController.delete);

export default routes;