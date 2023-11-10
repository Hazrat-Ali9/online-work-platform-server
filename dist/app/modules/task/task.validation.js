"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    title: zod_1.z.string({
        required_error: 'Title is required',
    }),
    price: zod_1.z.string({
        required_error: 'Price is required',
    }),
    description: zod_1.z.string({
        required_error: 'Description is required',
    }),
    address: zod_1.z.string({
        required_error: 'Address is required',
    }),
    sellerId: zod_1.z.string({
        required_error: 'Seller Id is required',
    }),
    categoryId: zod_1.z.string({
        required_error: 'Category Id is required',
    }),
});
const update = zod_1.z.object({
    title: zod_1.z.string().optional(),
    price: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    sellerId: zod_1.z.string().optional(),
    categoryId: zod_1.z.string().optional(),
});
exports.TaskValidation = {
    create,
    update,
};
