import { z } from 'zod';
import { gender } from '../../../constants/common';

const updateSeller = z.object({
  name: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum([...gender] as [string, ...string[]]).optional(),
  contactNo: z.string().optional(),
  occupation: z.string().optional(),
  bloodGroup: z.string().optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
});

export const SellerValidation = {
  updateSeller,
};
