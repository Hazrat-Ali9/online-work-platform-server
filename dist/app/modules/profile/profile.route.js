"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const FileUploadHelpers_1 = require("../../../helpers/FileUploadHelpers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const admin_validation_1 = require("../admin/admin.validation");
const buyer_validation_1 = require("../buyer/buyer.validation");
const seller_validation_1 = require("../seller/seller.validation");
const profile_controller_1 = require("./profile.controller");
const router = express_1.default.Router();
router.get('/me', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), profile_controller_1.ProfileController.getMyProfile);
router.patch('/me/update', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), FileUploadHelpers_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    const role = req.user.role;
    if (role === user_1.ENUM_USER_ROLE.SELLER) {
        req.body = seller_validation_1.SellerValidation.updateSeller.parse(JSON.parse(req.body.data));
    }
    else if (role === user_1.ENUM_USER_ROLE.BUYER) {
        req.body = buyer_validation_1.buyerValidation.updateBuyer.parse(JSON.parse(req.body.data));
    }
    else {
        req.body = admin_validation_1.AdminValidation.updateAdmin.parse(JSON.parse(req.body.data));
    }
    return profile_controller_1.ProfileController.updateMyProfile(req, res, next);
}, profile_controller_1.ProfileController.updateMyProfile);
exports.profileRoutes = router;
