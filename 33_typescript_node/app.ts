// to activate ts syntax check and auto-completion for express
import express from 'express';
import todosRoutes from './routes/todos';

const app = express();
app.use(todosRoutes);

app.listen(3000);
