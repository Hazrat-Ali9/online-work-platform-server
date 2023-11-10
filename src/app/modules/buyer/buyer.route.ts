import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import auth from '../../middlewares/auth';
import { BuyerController } from './buyer.controller';
import { buyerValidation } from './buyer.validation';

const router = express.Router();

router.get('/:id', BuyerController.getById);
router.get('/', BuyerController.getAll);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = buyerValidation.updateBuyer.parse(JSON.parse(req.body.data));
    return BuyerController.updateById(req, res, next);
  }
);

export const buyerRoutes = router;
