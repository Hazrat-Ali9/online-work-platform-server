"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const FileUploadHelpers_1 = require("../../../helpers/FileUploadHelpers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const buyer_controller_1 = require("./buyer.controller");
const buyer_validation_1 = require("./buyer.validation");
const router = express_1.default.Router();
router.get('/:id', buyer_controller_1.BuyerController.getById);
router.get('/', buyer_controller_1.BuyerController.getAll);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), FileUploadHelpers_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = buyer_validation_1.buyerValidation.updateBuyer.parse(JSON.parse(req.body.data));
    return buyer_controller_1.BuyerController.updateById(req, res, next);
});
exports.buyerRoutes = router;
