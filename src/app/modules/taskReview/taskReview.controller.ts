import { TaskReview } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { IGenericResponse } from '../../../interfaces/common';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { taskReviewFilterableFields } from './taskReview.constants';
import { TaskReviewService } from './taskReview.service';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const user = req.user as JwtPayload;
    const result = await TaskReviewService.create(data, user);

    sendResponse<TaskReview>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Task Review created successfully!',
      data: result,
    });
  }
);

const getAll: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, taskReviewFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await TaskReviewService.getAll(filters, options);

    sendResponse<IGenericResponse<TaskReview[]>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Task Review fetched successfully!',
      data: result,
    });
  }
);

const getById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TaskReviewService.getById(id);

    sendResponse<TaskReview>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'TaskReview fetched successfully!',
      data: result,
    });
  }
);

const updateById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const result = await TaskReviewService.updateById(id, data);

    sendResponse<TaskReview>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'TaskReview updated successfully!',
      data: result,
    });
  }
);

const deleteById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TaskReviewService.deleteById(id);

    sendResponse<TaskReview>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'TaskReview deleted successfully!',
      data: result,
    });
  }
);

export const TaskReviewController = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
