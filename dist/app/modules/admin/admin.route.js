"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const FileUploadHelpers_1 = require("../../../helpers/FileUploadHelpers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const router = express_1.default.Router();
router.get('/:id', admin_controller_1.AdminController.getById);
router.get('/', admin_controller_1.AdminController.getAll);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), FileUploadHelpers_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = admin_validation_1.AdminValidation.updateAdmin.parse(JSON.parse(req.body.data));
    return admin_controller_1.AdminController.updateById(req, res, next);
});
exports.adminRoutes = router;
