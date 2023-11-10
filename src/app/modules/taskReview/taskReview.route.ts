import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { TaskReviewController } from './taskReview.controller';
import { TaskReviewValidation } from './taskReview.validation';

const router = express.Router();

router.post(
  '/create-task-review',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER),
  validateRequest(TaskReviewValidation.create),
  TaskReviewController.create
);

router.get('/', TaskReviewController.getAll);

router.get('/:id', TaskReviewController.getById);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER),
  validateRequest(TaskReviewValidation.update),
  TaskReviewController.updateById
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER),
  TaskReviewController.deleteById
);

export const taskReviewRoutes = router;
