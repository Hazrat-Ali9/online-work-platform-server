import { Seller } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { IGenericResponse } from '../../../interfaces/common';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { buyerFilterableFields } from './buyer.constants';
import { BuyerService } from './buyer.service';

const getAll: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, buyerFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await BuyerService.getAll(filters, options);

    sendResponse<IGenericResponse<Seller[]>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Buyers fetched successfully!',
      data: result,
    });
  }
);

const getById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BuyerService.getById(id);

    sendResponse<Seller>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Buyer fetched successfully!',
      data: result,
    });
  }
);

const updateById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const result = await BuyerService.updateById(id, data, req);

    sendResponse<Seller>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Buyer updated successfully!',
      data: result,
    });
  }
);

export const BuyerController = {
  getAll,
  getById,
  updateById,
};
