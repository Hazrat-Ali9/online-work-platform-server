import { Admin, Buyer, Seller } from '@prisma/client';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import { IUploadFile } from '../../../interfaces/file';
import prisma from '../../../shared/prisma';

const getMyProfile = async (
  user: JwtPayload | null
): Promise<Seller | Buyer | Admin | null> => {
  let userData = null;

  if (user?.role === 'seller') {
    userData = await prisma.seller.findFirst({
      where: {
        userId: user.userId,
      },
    });
  } else if (user?.role === 'buyer') {
    userData = await prisma.buyer.findFirst({
      where: {
        userId: user.userId,
      },
    });
  } else {
    userData = await prisma.admin.findFirst({
      where: {
        userId: user?.userId,
      },
    });
  }

  if (!userData) {
    throw new Error('User not found');
  }

  return userData;
};

const updateMyProfile = async (
  req: Request,
  data: Partial<Seller | Buyer | Admin>
): Promise<Seller | Buyer | Admin | null> => {
  const user = req.user as JwtPayload;

  let userData = null;
  if (user?.role === 'seller') {
    userData = await prisma.seller.findFirst({
      where: {
        userId: user.userId,
      },
    });
  } else if (user?.role === 'buyer') {
    userData = await prisma.buyer.findFirst({
      where: {
        userId: user.userId,
      },
    });
  } else {
    userData = await prisma.admin.findFirst({
      where: {
        userId: user?.userId,
      },
    });
  }

  const file = req.file as IUploadFile;
  if (file) {
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

    if (uploadedImage) {
      req.body.avatarUrl = uploadedImage.secure_url;
    }
  }

  if (!userData) {
    throw new Error('User not found');
  }

  if (user?.role === 'seller') {
    userData = await prisma.seller.update({
      where: {
        id: userData.id,
      },
      data: {
        ...data,
      },
    });
  } else if (user?.role === 'buyer') {
    userData = await prisma.buyer.update({
      where: {
        id: userData.id,
      },
      data: {
        ...data,
      },
    });
  } else {
    userData = await prisma.admin.update({
      where: {
        id: userData.id,
      },
      data: {
        ...(data as Record<string, unknown>),
      },
    });
  }

  return userData;
};

export const ProfileService = {
  getMyProfile,
  updateMyProfile,
};
