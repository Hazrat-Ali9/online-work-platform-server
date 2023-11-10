import { z } from 'zod';

const create = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  price: z.string({
    required_error: 'Price is required',
  }),
  description: z.string({
    required_error: 'Description is required',
  }),
  address: z.string({
    required_error: 'Address is required',
  }),
  sellerId: z.string({
    required_error: 'Seller Id is required',
  }),
  categoryId: z.string({
    required_error: 'Category Id is required',
  }),
});

const update = z.object({
  title: z.string().optional(),
  price: z.string().optional(),
  description: z.string().optional(),
  address: z.string().optional(),
  sellerId: z.string().optional(),
  categoryId: z.string().optional(),
});

export const TaskValidation = {
  create,
  update,
};
