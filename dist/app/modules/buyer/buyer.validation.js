"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyerValidation = void 0;
const zod_1 = require("zod");
const common_1 = require("../../../constants/common");
const updateBuyer = zod_1.z.object({
    name: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string().optional(),
    gender: zod_1.z.enum([...common_1.gender]).optional(),
    contactNo: zod_1.z.string().optional(),
    occupation: zod_1.z.string().optional(),
    bloodGroup: zod_1.z.string().optional(),
    presentAddress: zod_1.z.string().optional(),
    permanentAddress: zod_1.z.string().optional(),
});
exports.buyerValidation = {
    updateBuyer,
};
