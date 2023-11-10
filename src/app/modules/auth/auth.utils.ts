import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../../../shared/prisma';

export const isPasswordMatched = async (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const FindUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error('User does not exist');
  }

  return user;
};
