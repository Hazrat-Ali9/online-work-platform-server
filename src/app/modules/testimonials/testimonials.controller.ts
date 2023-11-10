import { Testimonial } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { IGenericResponse } from '../../../interfaces/common';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { testimonialsFilterableFields } from './testimonials.constants';
import { TestimonialService } from './testimonials.service';
import { JwtPayload } from 'jsonwebtoken';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await TestimonialService.create(data, req.user as JwtPayload);

    sendResponse<Testimonial>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback Added successfully!',
      data: result,
    });
  }
);

const getAll: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, testimonialsFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await TestimonialService.getAll(filters, options);

    sendResponse<IGenericResponse<Testimonial[]>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Feedback Fetched Successfully!',
      data: result,
    });
  }
);

const getById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TestimonialService.getById(id);

    sendResponse<Testimonial>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback Fetched Successfully!',
      data: result,
    });
  }
);

const updateById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const result = await TestimonialService.updateById(id, data);

    sendResponse<Testimonial>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback Updated Successfully!',
      data: result,
    });
  }
);

const deleteById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TestimonialService.deleteById(id);

    sendResponse<Testimonial>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback deleted successfully!',
      data: result,
    });
  }
);

export const TestimonialController = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
