import { z } from 'zod';
import { gender } from '../../../constants/common';

const createSeller = z.object({
  email: z.string({
    required_error: 'Email is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
  seller: z.object({
    name: z.string({
      required_error: 'Seller name is required',
    }),
    dateOfBirth: z
      .string({
        required_error: 'Date of birth is required',
      })
      .optional(),
    gender: z
      .enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      })
      .optional(),
    contactNo: z
      .string({
        required_error: 'Contact number is required',
      })
      .optional(),
    occupation: z
      .string({
        required_error: 'Occupation is required',
      })
      .optional(),
    bloodGroup: z
      .string({
        required_error: 'Blood group is required',
      })
      .optional(),
    presentAddress: z
      .string({
        required_error: 'Present address is required',
      })
      .optional(),
    permanentAddress: z
      .string({
        required_error: 'Permanent address is required',
      })
      .optional(),
  }),
});

const createBuyer = z.object({
  email: z.string({
    required_error: 'Email is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
  buyer: z.object({
    name: z.string({
      required_error: 'Buyer name is required',
    }),
    dateOfBirth: z
      .string({
        required_error: 'Date of birth is required',
      })
      .optional(),
    gender: z
      .enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      })
      .optional(),
    contactNo: z
      .string({
        required_error: 'Contact number is required',
      })
      .optional(),
    occupation: z
      .string({
        required_error: 'Occupation is required',
      })
      .optional(),
    bloodGroup: z
      .string({
        required_error: 'Blood group is required',
      })
      .optional(),
    presentAddress: z
      .string({
        required_error: 'Present address is required',
      })
      .optional(),
    permanentAddress: z
      .string({
        required_error: 'Permanent address is required',
      })
      .optional(),
  }),
});

const createAdmin = z.object({
  email: z.string({
    required_error: 'Email is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
  admin: z.object({
    name: z.string({
      required_error: 'Admin name is required',
    }),
    dateOfBirth: z
      .string({
        required_error: 'Date of birth is required',
      })
      .optional(),
    gender: z
      .enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      })
      .optional(),
    contactNo: z
      .string({
        required_error: 'Contact number is required',
      })
      .optional(),
    occupation: z
      .string({
        required_error: 'Occupation is required',
      })
      .optional(),
    designation: z
      .string({
        required_error: 'Designation is required',
      })
      .optional(),
    bloodGroup: z
      .string({
        required_error: 'Blood group is required',
      })
      .optional(),
    presentAddress: z
      .string({
        required_error: 'Present address is required',
      })
      .optional(),
    permanentAddress: z
      .string({
        required_error: 'Permanent address is required',
      })
      .optional(),
  }),
});

export const UserValidation = { createSeller, createBuyer, createAdmin };
