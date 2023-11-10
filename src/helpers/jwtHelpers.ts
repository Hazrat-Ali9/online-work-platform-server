import httpStatus from 'http-status';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import ApiError from '../errors/ApiError';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    return new ApiError(httpStatus.UNAUTHORIZED, 'Token is invalid');
  }
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
