import { User } from '@prisma/client';
import { AuthJwt } from '@server/auth/auth.types';

export interface UserLoginResponse {
  jwt: AuthJwt;
  user: User;
}
