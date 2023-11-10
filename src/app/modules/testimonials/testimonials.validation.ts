import { z } from 'zod';

const create = z.object({
  body: z.object({
    description: z.string({
      required_error: 'Description is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    description: z.string().optional(),
  }),
});

export const TestimonialsValidation = {
  create,
  update,
};
