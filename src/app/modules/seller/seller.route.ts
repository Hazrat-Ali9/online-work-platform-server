import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import { SellerController } from './seller.controller';
import { SellerValidation } from './seller.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/:id', SellerController.getById);
router.get('/', SellerController.getAll);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SellerValidation.updateSeller.parse(JSON.parse(req.body.data));
    return SellerController.updateById(req, res, next);
  }
);

export const sellerRoutes = router;
