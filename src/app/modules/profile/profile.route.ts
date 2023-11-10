import express, { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import auth from '../../middlewares/auth';
import { AdminValidation } from '../admin/admin.validation';
import { buyerValidation } from '../buyer/buyer.validation';
import { SellerValidation } from '../seller/seller.validation';
import { ProfileController } from './profile.controller';

const router = express.Router();

router.get(
  '/me',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.BUYER,
    ENUM_USER_ROLE.SELLER
  ),
  ProfileController.getMyProfile
);

router.patch(
  '/me/update',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.BUYER,
    ENUM_USER_ROLE.SELLER
  ),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    const role = (req.user as JwtPayload).role;

    if (role === ENUM_USER_ROLE.SELLER) {
      req.body = SellerValidation.updateSeller.parse(JSON.parse(req.body.data));
    } else if (role === ENUM_USER_ROLE.BUYER) {
      req.body = buyerValidation.updateBuyer.parse(JSON.parse(req.body.data));
    } else {
      req.body = AdminValidation.updateAdmin.parse(JSON.parse(req.body.data));
    }

    return ProfileController.updateMyProfile(req, res, next);
  },
  ProfileController.updateMyProfile
);

export const profileRoutes = router;
