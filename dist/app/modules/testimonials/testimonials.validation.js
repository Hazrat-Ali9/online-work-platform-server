"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialsValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        description: zod_1.z.string({
            required_error: 'Description is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        description: zod_1.z.string().optional(),
    }),
});
exports.TestimonialsValidation = {
    create,
    update,
};
