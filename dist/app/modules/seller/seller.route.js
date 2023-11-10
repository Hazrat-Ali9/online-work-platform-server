"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const FileUploadHelpers_1 = require("../../../helpers/FileUploadHelpers");
const seller_controller_1 = require("./seller.controller");
const seller_validation_1 = require("./seller.validation");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/:id', seller_controller_1.SellerController.getById);
router.get('/', seller_controller_1.SellerController.getAll);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), FileUploadHelpers_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = seller_validation_1.SellerValidation.updateSeller.parse(JSON.parse(req.body.data));
    return seller_controller_1.SellerController.updateById(req, res, next);
});
exports.sellerRoutes = router;
