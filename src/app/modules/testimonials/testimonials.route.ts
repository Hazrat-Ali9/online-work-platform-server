import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { TestimonialController } from './testimonials.controller';
import { TestimonialsValidation } from './testimonials.validation';

const router = express.Router();

router.post(
  '/create-testimonial',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.BUYER,
    ENUM_USER_ROLE.SELLER
  ),
  validateRequest(TestimonialsValidation.create),
  TestimonialController.create
);

router.get('/', TestimonialController.getAll);

router.get('/:id', TestimonialController.getById);

router.patch(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.BUYER,
    ENUM_USER_ROLE.SELLER
  ),
  validateRequest(TestimonialsValidation.update),
  TestimonialController.updateById
);

router.delete(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.BUYER,
    ENUM_USER_ROLE.SELLER
  ),
  TestimonialController.deleteById
);

export const testimonialRoutes = router;
