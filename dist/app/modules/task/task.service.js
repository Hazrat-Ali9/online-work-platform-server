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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const FileUploadHelpers_1 = require("../../../helpers/FileUploadHelpers");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const task_constants_1 = require("./task.constants");
const create = (data, req) => __awaiter(void 0, void 0, void 0, function* () {
    // upload file to cloudinary
    const file = req.file;
    const uploadedImage = yield FileUploadHelpers_1.FileUploadHelper.uploadToCloudinary(file);
    if (uploadedImage) {
        data.imageUrl = uploadedImage.secure_url;
    }
    const newData = yield prisma_1.default.task.create({
        data,
    });
    return newData;
});
const getAll = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search } = filters, filterData = __rest(filters, ["search"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: task_constants_1.taskSearchableFields.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                return {
                    [key]: {
                        equals: filterData[key],
                    },
                };
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.task.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
        include: {
            taskReviews: true,
        },
    });
    const total = yield prisma_1.default.task.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.task.findUnique({
        where: {
            id,
        },
        include: {
            taskReviews: { include: { buyer: true } },
        },
    });
    return result;
});
const updateById = (id, data, req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data.imageUrl);
    // upload file to cloudinary
    const file = req.file;
    if (file) {
        const uploadedImage = yield FileUploadHelpers_1.FileUploadHelper.uploadToCloudinary(file);
        if (uploadedImage) {
            data.imageUrl = uploadedImage.secure_url;
        }
    }
    const result = yield prisma_1.default.task.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Transaction and Rollback
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.orderItem.deleteMany({
            where: {
                taskId: id,
            },
        });
        yield transactionClient.taskReview.deleteMany({
            where: {
                taskId: id,
            },
        });
        const task = yield transactionClient.task.delete({
            where: {
                id,
            },
        });
        return task;
    }));
    // delete file from cloudinary
    yield FileUploadHelpers_1.FileUploadHelper.deleteFromCloudinary(result === null || result === void 0 ? void 0 : result.imageUrl);
    return result;
});
exports.TaskService = {
    create,
    getAll,
    updateById,
    getById,
    deleteById,
};
