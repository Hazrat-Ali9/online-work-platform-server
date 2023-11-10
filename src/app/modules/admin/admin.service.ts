import { Admin, Prisma } from '@prisma/client';
import { Request } from 'express';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IUploadFile } from '../../../interfaces/file';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { adminSearchableFields } from './admin.constants';
import { IAdminFilterRequest } from './admin.interface';

const getAll = async (
  filters: IAdminFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Admin[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: adminSearchableFields.map(field => ({
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

  const whereConditions: Prisma.AdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.admin.count({
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

const getById = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new Error('Admin not found!');
  }

  return result;
};

const updateById = async (
  id: string,
  data: Partial<Admin>,
  req: Request
): Promise<Admin | null> => {
  // upload file to cloudinary
  const file = req.file as IUploadFile;
  if (file) {
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

    if (uploadedImage) {
      req.body.avatarUrl = uploadedImage.secure_url;
    }
  }

  const result = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

export const AdminService = {
  getAll,
  getById,
  updateById,
};
