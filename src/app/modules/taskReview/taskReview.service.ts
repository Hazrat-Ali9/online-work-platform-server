import { Prisma, TaskReview } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { taskReviewSearchableFields } from './taskReview.constants';
import { ITaskReviewFilterRequest } from './taskReview.interface';

const create = async (
  data: TaskReview,
  user: JwtPayload
): Promise<TaskReview> => {
  const { userId } = user;

  const buyer = await prisma.buyer.findUnique({
    where: {
      userId,
    },
  });

  if (!buyer) {
    throw new Error('Buyer not found');
  }

  const isBuyerReviewed = await prisma.taskReview.findFirst({
    where: {
      taskId: data.taskId,
      buyerId: buyer.id,
    },
  });

  if (isBuyerReviewed) {
    throw new Error('You have already reviewed this task');
  }

  const newData = await prisma.taskReview.create({
    data: {
      ...data,
      buyerId: buyer.id,
    },
  });

  return newData;
};

const getAll = async (
  filters: ITaskReviewFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<TaskReview[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: taskReviewSearchableFields.map(field => {
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
                equals: (filterData as Record<string, string>)[key],
              },
            },
          };
        }
        return {
          [key]: {
            equals: (filterData as Record<string, string>)[key],
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.TaskReviewWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.taskReview.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
    include: {
      buyer: true,
    },
  });

  const total = await prisma.taskReview.count({
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
};

const getById = async (id: string): Promise<TaskReview | null> => {
  const result = await prisma.taskReview.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateById = async (
  id: string,
  data: Partial<TaskReview>
): Promise<TaskReview | null> => {
  const result = await prisma.taskReview.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteById = async (id: string): Promise<TaskReview | null> => {
  const result = await prisma.taskReview.delete({
    where: {
      id,
    },
  });

  return result;
};

export const TaskReviewService = {
  create,
  getAll,
  updateById,
  getById,
  deleteById,
};
