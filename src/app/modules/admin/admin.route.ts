import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import auth from '../../middlewares/auth';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.get('/:id', AdminController.getById);
router.get('/', AdminController.getAll);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = AdminValidation.updateAdmin.parse(JSON.parse(req.body.data));
    return AdminController.updateById(req, res, next);
  }
);

export const adminRoutes = router;
