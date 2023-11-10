import { Seller } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { IGenericResponse } from '../../../interfaces/common';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { sellerFilterableFields } from './seller.constants';
import { SellerService } from './seller.service';

const getAll: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, sellerFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await SellerService.getAll(filters, options);

    sendResponse<IGenericResponse<Seller[]>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Seller fetched successfully!',
      data: result,
    });
  }
);

const getById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SellerService.getById(id);

    sendResponse<Seller>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Seller fetched successfully!',
      data: result,
    });
  }
);

const updateById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const result = await SellerService.updateById(id, data, req);

    sendResponse<Seller>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Seller updated successfully!',
      data: result,
    });
  }
);

export const SellerController = {
  getAll,
  getById,
  updateById,
};
