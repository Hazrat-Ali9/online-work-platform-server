import { Prisma, Seller } from '@prisma/client';
import { Request } from 'express';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IUploadFile } from '../../../interfaces/file';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { sellerSearchableFields } from './seller.constants';
import { ISellerFilterRequest } from './seller.interface';

const getAll = async (
  filters: ISellerFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Seller[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: sellerSearchableFields.map(field => ({
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

  const whereConditions: Prisma.SellerWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.seller.findMany({
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

  const total = await prisma.seller.count({
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

const getById = async (id: string): Promise<Seller | null> => {
  const result = await prisma.seller.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new Error('Seller not found!');
  }

  return result;
};

const updateById = async (
  id: string,
  data: Partial<Seller>,
  req: Request
): Promise<Seller | null> => {
  // upload file to cloudinary
  const file = req.file as IUploadFile;
  if (file) {
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

    if (uploadedImage) {
      req.body.avatarUrl = uploadedImage.secure_url;
    }
  }

  const result = await prisma.seller.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

export const SellerService = {
  getAll,
  getById,
  updateById,
};
