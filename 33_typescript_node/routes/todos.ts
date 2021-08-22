import { Router } from 'express';

// {} is for name export
// name export is like below
// export interface Todo {}
import { Todo } from '../models/todo';

const router = Router();

const todos: Todo[] = [];

router.get('/', (req, res, next) => {
  res.status(200).json({ todos });
});

router.post('/post', (req, res, next) => {
  const newTodo: Todo = {
    id: Math.random().toString(),
    text: req.body.text,
  };

  todos.push(newTodo);
});

export default router;
