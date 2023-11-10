import { Order, Prisma } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (
  user: JwtPayload,
  payload: {
    taskId: string;
    quantity: number;
    sellerId: string;
  }[]
) => {
  const { userId, role } = user;

  if (role !== 'buyer') {
    throw new Error('Only buyer can create order');
  }

  const isUserExist = await prisma.user.findUnique({
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
  const buyerId = isUserExist.buyer?.id as string;
  // transaction and rollback
  const newData = await prisma.$transaction(async transactionClient => {
    const order = await transactionClient.order.create({
      data: {
        buyerId,
      },
    });

    await transactionClient.orderItem.createMany({
      data: payload.map(item => ({
        sellerId: item.sellerId,
        taskId: item.taskId,
        quantity: item.quantity,
        orderId: order.id,
      })),
    });

    return order;
  });

  if (!newData) {
    throw new Error('Unable to create order');
  }

  const getOrderedItem = await prisma.order.findMany({
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
};

const getAllFromDB = async (user: JwtPayload): Promise<Order[]> => {
  const { userId, role } = user;

  const isSellerExist = await prisma.seller.findUnique({
    where: {
      userId,
    },
  });

  const whereCondition: Prisma.OrderWhereInput = {
    orderItems: {
      some: {
        sellerId: isSellerExist?.id,
      },
    },
  };

  const condition = role === 'admin' ? {} : whereCondition;
  const result = await prisma.order.findMany({
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
};

const getByIdFromDB = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
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
};

const updateByIdFromDB = async (
  id: string,
  data: Partial<Order>
): Promise<Order | null> => {
  const result = await prisma.order.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.delete({
    where: {
      id,
    },
    include: {
      orderItems: true,
    },
  });
  return result;
};

export const OrderService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdFromDB,
  deleteByIdFromDB,
};
