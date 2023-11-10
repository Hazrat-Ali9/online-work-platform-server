import { Seller } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { IGenericResponse } from '../../../interfaces/common';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { adminFilterableFields } from './admin.constants';
import { AdminService } from './admin.service';

const getAll: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await AdminService.getAll(filters, options);

    sendResponse<IGenericResponse<Seller[]>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Admin fetched successfully!',
      data: result,
    });
  }
);

const getById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AdminService.getById(id);

    sendResponse<Seller>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin fetched successfully!',
      data: result,
    });
  }
);

const updateById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const result = await AdminService.updateById(id, data, req);

    sendResponse<Seller>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin updated successfully!',
      data: result,
    });
  }
);

export const AdminController = {
  getAll,
  getById,
  updateById,
};
