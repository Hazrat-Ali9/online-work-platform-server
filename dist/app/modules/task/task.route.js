"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const FileUploadHelpers_1 = require("../../../helpers/FileUploadHelpers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const task_controller_1 = require("./task.controller");
const task_validation_1 = require("./task.validation");
const router = express_1.default.Router();
router.post('/create-task', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SELLER), FileUploadHelpers_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = task_validation_1.TaskValidation.create.parse(JSON.parse(req.body.data));
    return task_controller_1.TaskController.create(req, res, next);
});
router.get('/', task_controller_1.TaskController.getAll);
router.get('/:id', task_controller_1.TaskController.getById);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SELLER), FileUploadHelpers_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = task_validation_1.TaskValidation.update.parse(JSON.parse(req.body.data));
    return task_controller_1.TaskController.updateById(req, res, next);
});
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SELLER), task_controller_1.TaskController.deleteById);
exports.taskRoutes = router;
