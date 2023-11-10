import { z } from 'zod';

const create = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const CategoryValidation = {
  create,
  update,
};
