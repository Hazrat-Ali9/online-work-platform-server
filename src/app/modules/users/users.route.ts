import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import auth from '../../middlewares/auth';
import { UserController } from './users.controller';
import { UserValidation } from './users.validation';

const router = express.Router();

router.post(
  '/seller/register',
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createSeller.parse(JSON.parse(req.body.data));
    return UserController.createSeller(req, res, next);
  }
);

router.post(
  '/buyer/register',
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createBuyer.parse(JSON.parse(req.body.data));
    return UserController.createBuyer(req, res, next);
  }
);

router.post(
  '/admin/register',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createAdmin.parse(JSON.parse(req.body.data));
    return UserController.createAdmin(req, res, next);
  }
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.getUsers
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.deleteUser
);

export const userRoutes = router;
