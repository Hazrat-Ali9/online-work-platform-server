"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const taskReview_controller_1 = require("./taskReview.controller");
const taskReview_validation_1 = require("./taskReview.validation");
const router = express_1.default.Router();
router.post('/create-task-review', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.BUYER), (0, validateRequest_1.default)(taskReview_validation_1.TaskReviewValidation.create), taskReview_controller_1.TaskReviewController.create);
router.get('/', taskReview_controller_1.TaskReviewController.getAll);
router.get('/:id', taskReview_controller_1.TaskReviewController.getById);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.BUYER), (0, validateRequest_1.default)(taskReview_validation_1.TaskReviewValidation.update), taskReview_controller_1.TaskReviewController.updateById);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.BUYER), taskReview_controller_1.TaskReviewController.deleteById);
exports.taskReviewRoutes = router;
