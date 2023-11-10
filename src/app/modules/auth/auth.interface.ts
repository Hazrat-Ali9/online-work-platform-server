export type ILoginUserResponse = {
  accessToken?: string;
  refreshToken?: string;
  needsPasswordChange?: boolean;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
