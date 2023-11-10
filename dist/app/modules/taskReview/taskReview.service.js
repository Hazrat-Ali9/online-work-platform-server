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
exports.TaskReviewService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const taskReview_constants_1 = require("./taskReview.constants");
const create = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    const buyer = yield prisma_1.default.buyer.findUnique({
        where: {
            userId,
        },
    });
    if (!buyer) {
        throw new Error('Buyer not found');
    }
    const isBuyerReviewed = yield prisma_1.default.taskReview.findFirst({
        where: {
            taskId: data.taskId,
            buyerId: buyer.id,
        },
    });
    if (isBuyerReviewed) {
        throw new Error('You have already reviewed this task');
    }
    const newData = yield prisma_1.default.taskReview.create({
        data: Object.assign(Object.assign({}, data), { buyerId: buyer.id }),
    });
    return newData;
});
const getAll = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search } = filters, filterData = __rest(filters, ["search"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: taskReview_constants_1.taskReviewSearchableFields.map(field => {
                return {
                    [field]: {
                        contains: search,
                        mode: 'insensitive',
                    },
                };
            }),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (key === 'userId') {
                    return {
                        buyer: {
                            userId: {
                                equals: filterData[key],
                            },
                        },
                    };
                }
                return {
                    [key]: {
                        equals: filterData[key],
                    },
                };
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.taskReview.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
        include: {
            buyer: true,
        },
    });
    const total = yield prisma_1.default.taskReview.count({
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
    const result = yield prisma_1.default.taskReview.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.taskReview.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.taskReview.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.TaskReviewService = {
    create,
    getAll,
    updateById,
    getById,
    deleteById,
};
