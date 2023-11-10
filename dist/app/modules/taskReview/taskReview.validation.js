"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskReviewValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z.string({
            required_error: 'Comment is required',
        }),
        rating: zod_1.z.number({
            required_error: 'Rating is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
    }),
});
exports.TaskReviewValidation = {
    create,
    update,
};
