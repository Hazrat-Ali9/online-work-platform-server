import { Admin, Buyer, Seller } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getMyProfile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProfileService.getMyProfile(req.user);

    sendResponse<Seller | Buyer | Admin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'My profile fetched successfully!',
      data: result,
    });
  }
);

const updateMyProfile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProfileService.updateMyProfile(req, req.body);

    sendResponse<Seller | Buyer | Admin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'My profile fetched successfully!',
      data: result,
    });
  }
);

export const ProfileController = {
  getMyProfile,
  updateMyProfile,
};
