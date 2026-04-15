import { Router } from 'express';
import {
  createTodo,
  deleteAllTodos,
  deleteCompletedTodos,
  deleteTodo,
  getTodos,
  setTodoCompleted,
  toggleTodo,
  updateTodo,
} from '../controllers/todoController.js';

const router = Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.delete('/completed', deleteCompletedTodos);
router.delete('/all', deleteAllTodos);
router.patch('/:id', updateTodo);
router.patch('/:id/toggle', toggleTodo);
router.patch('/:id/completed', setTodoCompleted);
router.delete('/:id', deleteTodo);

export default router;
