import { z } from 'zod';

const create = z.object({
  body: z.object({
    comment: z.string({
      required_error: 'Comment is required',
    }),
    rating: z.number({
      required_error: 'Rating is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const TaskReviewValidation = {
  create,
  update,
};
