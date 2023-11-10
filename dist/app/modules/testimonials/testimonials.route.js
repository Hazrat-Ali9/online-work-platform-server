"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const testimonials_controller_1 = require("./testimonials.controller");
const testimonials_validation_1 = require("./testimonials.validation");
const router = express_1.default.Router();
router.post('/create-testimonial', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), (0, validateRequest_1.default)(testimonials_validation_1.TestimonialsValidation.create), testimonials_controller_1.TestimonialController.create);
router.get('/', testimonials_controller_1.TestimonialController.getAll);
router.get('/:id', testimonials_controller_1.TestimonialController.getById);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), (0, validateRequest_1.default)(testimonials_validation_1.TestimonialsValidation.update), testimonials_controller_1.TestimonialController.updateById);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), testimonials_controller_1.TestimonialController.deleteById);
exports.testimonialRoutes = router;
