"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const FileUploadHelpers_1 = require("../../../helpers/FileUploadHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getMyProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let userData = null;
    if ((user === null || user === void 0 ? void 0 : user.role) === 'seller') {
        userData = yield prisma_1.default.seller.findFirst({
            where: {
                userId: user.userId,
            },
        });
    }
    else if ((user === null || user === void 0 ? void 0 : user.role) === 'buyer') {
        userData = yield prisma_1.default.buyer.findFirst({
            where: {
                userId: user.userId,
            },
        });
    }
    else {
        userData = yield prisma_1.default.admin.findFirst({
            where: {
                userId: user === null || user === void 0 ? void 0 : user.userId,
            },
        });
    }
    if (!userData) {
        throw new Error('User not found');
    }
    return userData;
});
const updateMyProfile = (req, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    let userData = null;
    if ((user === null || user === void 0 ? void 0 : user.role) === 'seller') {
        userData = yield prisma_1.default.seller.findFirst({
            where: {
                userId: user.userId,
            },
        });
    }
    else if ((user === null || user === void 0 ? void 0 : user.role) === 'buyer') {
        userData = yield prisma_1.default.buyer.findFirst({
            where: {
                userId: user.userId,
            },
        });
    }
    else {
        userData = yield prisma_1.default.admin.findFirst({
            where: {
                userId: user === null || user === void 0 ? void 0 : user.userId,
            },
        });
    }
    const file = req.file;
    if (file) {
        const uploadedImage = yield FileUploadHelpers_1.FileUploadHelper.uploadToCloudinary(file);
        if (uploadedImage) {
            req.body.avatarUrl = uploadedImage.secure_url;
        }
    }
    if (!userData) {
        throw new Error('User not found');
    }
    if ((user === null || user === void 0 ? void 0 : user.role) === 'seller') {
        userData = yield prisma_1.default.seller.update({
            where: {
                id: userData.id,
            },
            data: Object.assign({}, data),
        });
    }
    else if ((user === null || user === void 0 ? void 0 : user.role) === 'buyer') {
        userData = yield prisma_1.default.buyer.update({
            where: {
                id: userData.id,
            },
            data: Object.assign({}, data),
        });
    }
    else {
        userData = yield prisma_1.default.admin.update({
            where: {
                id: userData.id,
            },
            data: Object.assign({}, data),
        });
    }
    return userData;
});
exports.ProfileService = {
    getMyProfile,
    updateMyProfile,
};
