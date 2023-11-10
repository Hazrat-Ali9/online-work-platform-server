import { Category } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { IGenericResponse } from '../../../interfaces/common';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { categoryFilterableFields } from './category.constants';
import { CategoryService } from './category.service';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await CategoryService.create(data);

    sendResponse<Category>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category created successfully!',
      data: result,
    });
  }
);

const getAll: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, categoryFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await CategoryService.getAll(filters, options);

    sendResponse<IGenericResponse<Category[]>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Categories fetched successfully!',
      data: result,
    });
  }
);

const getById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryService.getById(id);

    sendResponse<Category>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category fetched successfully!',
      data: result,
    });
  }
);

const updateById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const result = await CategoryService.updateById(id, data);

    sendResponse<Category>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category updated successfully!',
      data: result,
    });
  }
);

const deleteById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryService.deleteById(id);

    sendResponse<Category>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category deleted successfully!',
      data: result,
    });
  }
);

export const CategoryController = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
