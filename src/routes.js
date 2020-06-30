import express from 'express';
const routes = express.Router();

import AccountController from './controllers/AccountController.js';

routes.get('/', AccountController.index);
routes.post('/deposit', AccountController.deposit);

export default routes;