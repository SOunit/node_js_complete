import { Router } from 'express';

// {} is for name export
// name export is like below
// export interface Todo {}
import { Todo } from '../models/todo';

type RequestBody = { text: string };
type RequestParams = { todoId: string };

const router = Router();

let todos: Todo[] = [];

router.get('/', (req, res, next) => {
  res.status(200).json({ todos });
});

router.post('/todo', (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: Math.random().toString(),
    text: body.text,
  };

  todos.push(newTodo);
  res.status(201).json({ message: 'Added todo', todo: newTodo, todos });
});

router.put('/todo/:todoId', (req, res, next) => {
  const params = req.params as RequestParams;
  const tid = params.todoId;
  const body = req.body as RequestBody;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    return res.status(200).json({ message: 'Updated todo', todos });
  }
  res.status(404).json({ message: 'Could not find todo fot this id.' });
});

router.delete('/todos/:todoId', (req, res, next) => {
  const params = req.params as RequestParams;
  todos = todos.filter((todoItem) => todoItem.id !== params.todoId);
  res.status(200).json({ message: 'Deleted todo', todos });
});

export default router;
