import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => res.send("<h1>Hello Routes JS</h1>"));

export default routes;