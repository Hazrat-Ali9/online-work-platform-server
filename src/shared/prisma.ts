import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../config';
const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

prisma.$use(async (params, next) => {
  if (params?.model === 'User' && params?.action === 'create') {
    params.args.data.password = await bcrypt.hash(
      params.args.data.password,
      Number(config.bycrypt_salt_rounds)
    );
  }
  const result = await next(params);

  if (
    params?.model === 'User' &&
    params?.args?.select?.password !== true &&
    result
  ) {
    if (Array.isArray(result)) {
      result.forEach(user => {
        delete user.password;
      });
    } else if (typeof result === 'object' && result !== null) {
      delete result.password;
    }
  }
  return result;
});

export default prisma;
