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
exports.OrderService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDB = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId, role } = user;
    if (role !== 'buyer') {
        throw new Error('Only buyer can create order');
    }
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            buyer: true,
        },
    });
    if (!isUserExist) {
        throw new Error('User not found');
    }
    const buyerId = (_a = isUserExist.buyer) === null || _a === void 0 ? void 0 : _a.id;
    // transaction and rollback
    const newData = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield transactionClient.order.create({
            data: {
                buyerId,
            },
        });
        yield transactionClient.orderItem.createMany({
            data: payload.map(item => ({
                sellerId: item.sellerId,
                taskId: item.taskId,
                quantity: item.quantity,
                orderId: order.id,
            })),
        });
        return order;
    }));
    if (!newData) {
        throw new Error('Unable to create order');
    }
    const getOrderedItem = yield prisma_1.default.order.findMany({
        where: {
            buyerId,
        },
        include: {
            orderItems: {
                select: {
                    orderId: true,
                    quantity: true,
                },
            },
        },
    });
    return getOrderedItem;
});
const getAllFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = user;
    const isSellerExist = yield prisma_1.default.seller.findUnique({
        where: {
            userId,
        },
    });
    const whereCondition = {
        orderItems: {
            some: {
                sellerId: isSellerExist === null || isSellerExist === void 0 ? void 0 : isSellerExist.id,
            },
        },
    };
    const condition = role === 'admin' ? {} : whereCondition;
    const result = yield prisma_1.default.order.findMany({
        where: condition,
        include: {
            buyer: {
                select: {
                    avatarUrl: true,
                    name: true,
                    presentAddress: true,
                },
            },
            orderItems: {
                include: {
                    tasks: true,
                },
            },
        },
    });
    if (!result) {
        throw new Error('Order not found');
    }
    return result;
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findUnique({
        where: {
            id,
        },
        include: {
            orderItems: {
                select: {
                    taskId: true,
                    quantity: true,
                },
            },
        },
    });
    // if (role !== 'admin' && result?.buyerId !== userId) {
    //   throw new Error('You are not authorized to view this order');
    // }
    if (!result) {
        throw new Error('Order not found');
    }
    return result;
});
const updateByIdFromDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.delete({
        where: {
            id,
        },
        include: {
            orderItems: true,
        },
    });
    return result;
});
exports.OrderService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateByIdFromDB,
    deleteByIdFromDB,
};
