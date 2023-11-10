import { Task } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { IGenericResponse } from '../../../interfaces/common';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { taskFilterableFields } from './task.constants';
import { TaskService } from './task.service';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await TaskService.create(data, req);

    sendResponse<Task>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Task created successfully!',
      data: result,
    });
  }
);

const getAll: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, taskFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await TaskService.getAll(filters, options);

    sendResponse<IGenericResponse<Task[]>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Task Fetched Successfully!',
      data: result,
    });
  }
);

const getById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TaskService.getById(id);

    sendResponse<Task>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Task Fetched Successfully!',
      data: result,
    });
  }
);

const updateById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const result = await TaskService.updateById(id, data, req);

    sendResponse<Task>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Task Updated Successfully!',
      data: result,
    });
  }
);

const deleteById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TaskService.deleteById(id);

    sendResponse<Task>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Task deleted successfully!',
      data: result,
    });
  }
);

export const TaskController = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
