import { AuthJwt } from '@server/auth/auth.types';
import { UserById } from '@shared/interfaces';

export interface UserLoginResponse {
  jwt: AuthJwt;
  user: UserById;
}
