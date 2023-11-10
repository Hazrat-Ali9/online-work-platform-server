import { User } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './users.interface';
import { UserService } from './users.service';

const createSeller: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { seller, ...userData } = req.body;
    const result = await UserService.createSeller(seller, userData, req);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Seller created successfully!',
      data: result,
    });
  }
);

const createBuyer: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { buyer, ...userData } = req.body;
    const result = await UserService.createBuyer(buyer, userData, req);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Buyer created successfully!',
      data: result,
    });
  }
);

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await UserService.createAdmin(admin, userData, req);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
  }
);

const getUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.getUsers();

    sendResponse<User[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All users created successfully!',
      data: result,
    });
  }
);

const deleteUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.deleteUser(id);

    sendResponse<User>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  }
);

export const UserController = {
  createSeller,
  createBuyer,
  createAdmin,
  getUsers,
  deleteUser,
};
