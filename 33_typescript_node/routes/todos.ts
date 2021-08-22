import { Router } from 'express';

// {} is for name export
// name export is like below
// export interface Todo {}
import { Todo } from '../models/todo';

const router = Router();

let todos: Todo[] = [];

router.get('/', (req, res, next) => {
  res.status(200).json({ todos });
});

router.post('/todo', (req, res, next) => {
  const newTodo: Todo = {
    id: Math.random().toString(),
    text: req.body.text,
  };

  todos.push(newTodo);
  res.status(201).json({ message: 'Added todo', todo: newTodo, todos });
});

router.put('/todo/:todoId', (req, res, next) => {
  const tid = req.params.todoId;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
    return res.status(200).json({ message: 'Updated todo', todos });
  }
  res.status(404).json({ message: 'Could not find todo fot this id.' });
});

router.delete('/todos/:todoId', (req, res, next) => {
  todos = todos.filter((todoItem) => todoItem.id !== req.params.todoId);
  res.status(200).json({ message: 'Deleted todo', todos });
});

export default router;
