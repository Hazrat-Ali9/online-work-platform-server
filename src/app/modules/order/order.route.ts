import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';

const router = express.Router();

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SELLER,
    ENUM_USER_ROLE.BUYER
  ),
  OrderController.getAllFromDB
);
router.get(
  '/:orderId',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER),
  OrderController.getByIdFromDB
);
router.delete(
  '/:orderId',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER),
  OrderController.deleteByIdFromDB
);

router.patch(
  '/:orderId',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER),
  OrderController.updateByIdFromDB
);

router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.BUYER),
  OrderController.insertIntoDB
);

export const orderRoutes = router;
