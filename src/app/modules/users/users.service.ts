import { Admin, Buyer, Seller, User } from '@prisma/client';
import { Request } from 'express';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import { IUploadFile } from '../../../interfaces/file';
import prisma from '../../../shared/prisma';
import { IUser } from './users.interface';

const createSeller = async (
  seller: Seller,
  user: User,
  req: Request
): Promise<Omit<IUser, 'password'>> => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: user?.email,
    },
  });

  // check if user already exists
  if (existingUser) {
    throw new Error('User already exists');
  }

  // upload file to cloudinary
  const file = req.file as IUploadFile;
  if (file) {
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

    if (uploadedImage) {
      req.body.seller.avatarUrl = uploadedImage.secure_url;
    }
  }
  // req.body.seller.avatarUrl = '';
  // set role
  user.role = 'seller';

  // create user and seller in a transaction to ensure data integrity
  const newData = await prisma.$transaction(async transactionClient => {
    const userData = await transactionClient.user.create({
      data: user,
    });

    const sellerData = await transactionClient.seller.create({
      data: { ...seller, email: userData.email, userId: userData.id },
    });

    return { ...userData, seller: sellerData };
  });

  if (!newData) {
    throw new Error('Unable to create seller');
  }

  return newData;
};

const createBuyer = async (
  buyer: Buyer,
  user: User,
  req: Request
): Promise<Omit<IUser, 'password'>> => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: user?.email,
    },
  });

  // check if user already exists
  if (existingUser) {
    throw new Error('User already exists');
  }

  // upload file to cloudinary
  const file = req.file as IUploadFile;
  if (file) {
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

    if (uploadedImage) {
      req.body.buyer.avatarUrl = uploadedImage.secure_url;
    }
  }
  // set role
  user.role = 'buyer';

  // create user and buyer in a transaction to ensure data integrity
  const newData = await prisma.$transaction(async transactionClient => {
    const userData = await transactionClient.user.create({
      data: user,
    });

    const buyerData = await transactionClient.buyer.create({
      data: { ...buyer, email: userData.email, userId: userData.id },
    });

    return { ...userData, buyer: buyerData };
  });

  if (!newData) {
    throw new Error('Unable to create buyer');
  }

  return newData;
};

const createAdmin = async (
  admin: Admin,
  user: User,
  req: Request
): Promise<Omit<IUser, 'password'>> => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: user?.email,
    },
  });

  // check if user already exists
  if (existingUser) {
    throw new Error('User already exists');
  }

  // upload file to cloudinary
  const file = req.file as IUploadFile;
  if (file) {
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

    if (uploadedImage) {
      req.body.admin.avatarUrl = uploadedImage.secure_url;
    }
  }

  // set role
  user.role = 'admin';

  // create user and admin in a transaction to ensure data integrity
  const newData = await prisma.$transaction(async transactionClient => {
    const userData = await transactionClient.user.create({
      data: user,
    });

    const adminData = await transactionClient.admin.create({
      data: { ...admin, email: userData.email, userId: userData.id },
    });

    return { ...userData, admin: adminData };
  });

  if (!newData) {
    throw new Error('Unable to create admin');
  }

  return newData;
};

const getUsers = async (): Promise<User[]> => {
  const result = await prisma.user.findMany({
    include: {
      seller: true,
      buyer: true,
      admin: true,
    },
  });

  return result;
};

const deleteUser = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });

  return result;
};

export const UserService = {
  createSeller,
  createBuyer,
  createAdmin,
  getUsers,
  deleteUser,
};
