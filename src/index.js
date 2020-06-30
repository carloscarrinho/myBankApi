const port = 3333;
import express from  'express';
import routes from './routes.js';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(port, () => `App running on port ${port}`);