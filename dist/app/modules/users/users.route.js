"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const FileUploadHelpers_1 = require("../../../helpers/FileUploadHelpers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const users_controller_1 = require("./users.controller");
const users_validation_1 = require("./users.validation");
const router = express_1.default.Router();
router.post('/seller/register', FileUploadHelpers_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = users_validation_1.UserValidation.createSeller.parse(JSON.parse(req.body.data));
    return users_controller_1.UserController.createSeller(req, res, next);
});
router.post('/buyer/register', FileUploadHelpers_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = users_validation_1.UserValidation.createBuyer.parse(JSON.parse(req.body.data));
    return users_controller_1.UserController.createBuyer(req, res, next);
});
router.post('/admin/register', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), FileUploadHelpers_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = users_validation_1.UserValidation.createAdmin.parse(JSON.parse(req.body.data));
    return users_controller_1.UserController.createAdmin(req, res, next);
});
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UserController.getUsers);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UserController.deleteUser);
exports.userRoutes = router;
