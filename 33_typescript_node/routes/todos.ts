import { Router } from 'express';

const router = Router();

const todos: string[] = [];

router.get('/', (req, res, next) => {
  res.status(200).json({ todos });
});

export default router;
