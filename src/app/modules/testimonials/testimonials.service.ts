import { Prisma, Testimonial } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { testimonialsSearchableFields } from './testimonials.constants';
import { ITestimonialFilterRequest } from './testimonials.interface';

const create = async (
  data: Testimonial,
  user: JwtPayload
): Promise<Testimonial> => {
  const isExist = await prisma.testimonial.findFirst({
    where: {
      userId: user.userId,
    },
  });

  if (isExist) {
    throw new Error('Already given feedback!');
  }

  const newData = await prisma.testimonial.create({
    data,
  });

  return newData;
};

const getAll = async (
  filters: ITestimonialFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Testimonial[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: testimonialsSearchableFields.map(field => ({
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

  const whereConditions: Prisma.TestimonialWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.testimonial.findMany({
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
      user: {
        select: {
          admin: {
            select: {
              name: true,
              avatarUrl: true,
              presentAddress: true,
            },
          },
          buyer: {
            select: {
              name: true,
              avatarUrl: true,
              presentAddress: true,
            },
          },
          seller: {
            select: {
              name: true,
              avatarUrl: true,
              presentAddress: true,
            },
          },
        },
      },
    },
  });

  const total = await prisma.testimonial.count({
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

const getById = async (id: string): Promise<Testimonial | null> => {
  const result = await prisma.testimonial.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateById = async (
  id: string,
  data: Partial<Testimonial>
): Promise<Testimonial | null> => {
  const result = await prisma.testimonial.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteById = async (id: string): Promise<Testimonial | null> => {
  const result = await prisma.testimonial.delete({
    where: {
      id,
    },
  });

  return result;
};

export const TestimonialService = {
  create,
  getAll,
  updateById,
  getById,
  deleteById,
};
