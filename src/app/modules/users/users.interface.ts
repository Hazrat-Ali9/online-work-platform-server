import { Admin, Buyer, Seller } from "@prisma/client";

export type IUser = {
  email: string;
  role: string;
  password?: string;
  needsPasswordChange: boolean;
  seller?: Seller;
  buyer?: Buyer;
  admin?: Admin;
};
