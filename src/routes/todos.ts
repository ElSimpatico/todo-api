import express, { Router } from 'express';

import { TodosController } from '@controllers';
import { validate } from '@middlewares';
import { pagination, update, add } from '@validations';

const router: Router = express.Router();

router.route('/').get(validate([...pagination]), TodosController.getAll);
router
    .route('/:id')
    .get(TodosController.getTodo)
    .put(validate([...update]), TodosController.updateTodo)
    .delete(TodosController.deleteTodo);
router.route('/add').post(validate([...add]), TodosController.addTodo);

export const TodoRouter = router;
