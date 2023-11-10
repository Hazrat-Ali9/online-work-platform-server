import { Prisma, Task } from '@prisma/client';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IUploadFile } from '../../../interfaces/file';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { taskSearchableFields } from './task.constants';
import { ITaskFilterRequest } from './task.interface';

const create = async (data: Task, req: Request): Promise<Task> => {
  // upload file to cloudinary
  const file = req.file as IUploadFile;

  const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

  if (uploadedImage) {
    data.imageUrl = uploadedImage.secure_url;
  }

  const newData = await prisma.task.create({
    data,
  });

  return newData;
};

const getAll = async (
  filters: ITaskFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Task[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: taskSearchableFields.map(field => ({
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
            equals: (filterData as Record<string, string>)[key],
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.TaskWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.task.findMany({
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
      taskReviews: true,
    },
  });

  const total = await prisma.task.count({
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

const getById = async (id: string): Promise<Task | null> => {
  const result = await prisma.task.findUnique({
    where: {
      id,
    },
    include: {
      taskReviews: { include: { buyer: true } },
    },
  });

  return result;
};

const updateById = async (
  id: string,
  data: Partial<Task>,
  req: JwtPayload
): Promise<Task | null> => {
  console.log(data.imageUrl);

  // upload file to cloudinary
  const file = req.file as IUploadFile;
  if (file) {
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);
    if (uploadedImage) {
      data.imageUrl = uploadedImage.secure_url;
    }
  }

  const result = await prisma.task.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteById = async (id: string): Promise<Task | null> => {


  // Transaction and Rollback
  const result = await prisma.$transaction(async transactionClient => {
    await transactionClient.orderItem.deleteMany({
      where: {
        taskId: id,
      },
    });

    await transactionClient.taskReview.deleteMany({
      where: {
        taskId: id,
      },
    });

    const task = await transactionClient.task.delete({
      where: {
        id,
      },
    });

    return task;
  });
  // delete file from cloudinary
  await FileUploadHelper.deleteFromCloudinary(result?.imageUrl);

  return result;
};

export const TaskService = {
  create,
  getAll,
  updateById,
  getById,
  deleteById,
};
