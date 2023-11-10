import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import auth from '../../middlewares/auth';
import { TaskController } from './task.controller';
import { TaskValidation } from './task.validation';

const router = express.Router();

router.post(
  '/create-task',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = TaskValidation.create.parse(JSON.parse(req.body.data));
    return TaskController.create(req, res, next);
  }
);

router.get('/', TaskController.getAll);

router.get('/:id', TaskController.getById);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = TaskValidation.update.parse(JSON.parse(req.body.data));
    return TaskController.updateById(req, res, next);
  }
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER),
  TaskController.deleteById
);

export const taskRoutes = router;
