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
exports.UserService = void 0;
const FileUploadHelpers_1 = require("../../../helpers/FileUploadHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createSeller = (seller, user, req) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.default.user.findFirst({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    // check if user already exists
    if (existingUser) {
        throw new Error('User already exists');
    }
    // upload file to cloudinary
    const file = req.file;
    if (file) {
        const uploadedImage = yield FileUploadHelpers_1.FileUploadHelper.uploadToCloudinary(file);
        if (uploadedImage) {
            req.body.seller.avatarUrl = uploadedImage.secure_url;
        }
    }
    // req.body.seller.avatarUrl = '';
    // set role
    user.role = 'seller';
    // create user and seller in a transaction to ensure data integrity
    const newData = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = yield transactionClient.user.create({
            data: user,
        });
        const sellerData = yield transactionClient.seller.create({
            data: Object.assign(Object.assign({}, seller), { email: userData.email, userId: userData.id }),
        });
        return Object.assign(Object.assign({}, userData), { seller: sellerData });
    }));
    if (!newData) {
        throw new Error('Unable to create seller');
    }
    return newData;
});
const createBuyer = (buyer, user, req) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.default.user.findFirst({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    // check if user already exists
    if (existingUser) {
        throw new Error('User already exists');
    }
    // upload file to cloudinary
    const file = req.file;
    if (file) {
        const uploadedImage = yield FileUploadHelpers_1.FileUploadHelper.uploadToCloudinary(file);
        if (uploadedImage) {
            req.body.buyer.avatarUrl = uploadedImage.secure_url;
        }
    }
    // set role
    user.role = 'buyer';
    // create user and buyer in a transaction to ensure data integrity
    const newData = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = yield transactionClient.user.create({
            data: user,
        });
        const buyerData = yield transactionClient.buyer.create({
            data: Object.assign(Object.assign({}, buyer), { email: userData.email, userId: userData.id }),
        });
        return Object.assign(Object.assign({}, userData), { buyer: buyerData });
    }));
    if (!newData) {
        throw new Error('Unable to create buyer');
    }
    return newData;
});
const createAdmin = (admin, user, req) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.default.user.findFirst({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    // check if user already exists
    if (existingUser) {
        throw new Error('User already exists');
    }
    // upload file to cloudinary
    const file = req.file;
    if (file) {
        const uploadedImage = yield FileUploadHelpers_1.FileUploadHelper.uploadToCloudinary(file);
        if (uploadedImage) {
            req.body.admin.avatarUrl = uploadedImage.secure_url;
        }
    }
    // set role
    user.role = 'admin';
    // create user and admin in a transaction to ensure data integrity
    const newData = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = yield transactionClient.user.create({
            data: user,
        });
        const adminData = yield transactionClient.admin.create({
            data: Object.assign(Object.assign({}, admin), { email: userData.email, userId: userData.id }),
        });
        return Object.assign(Object.assign({}, userData), { admin: adminData });
    }));
    if (!newData) {
        throw new Error('Unable to create admin');
    }
    return newData;
});
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({
        include: {
            seller: true,
            buyer: true,
            admin: true,
        },
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.UserService = {
    createSeller,
    createBuyer,
    createAdmin,
    getUsers,
    deleteUser,
};
