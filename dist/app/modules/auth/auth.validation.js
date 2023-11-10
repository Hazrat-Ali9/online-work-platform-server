"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    headers: zod_1.z.object({
        authorization: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
const changePasswordZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: 'Old password  is required',
        }),
        newPassword: zod_1.z.string({
            required_error: 'New password  is required',
        }),
    }),
});
exports.AuthValidation = {
    loginZodSchema,
    refreshTokenZodSchema,
    changePasswordZodSchema,
};
