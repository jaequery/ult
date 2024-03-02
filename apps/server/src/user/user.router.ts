import { Injectable, UseFilters } from '@nestjs/common';
import { TrpcExceptionFilter } from '@server/trpc/trpc.exception-handler';
import { TrpcService } from '@server/trpc/trpc.service';
import { UserService } from '@server/user/user.service';
import {
  UserFindAllDto,
  UserFindByIdDto,
  UserLoginDto,
  UserRemoveDto,
  UserResetPasswordDto,
  UserSignupDto,
  UserVerifyAccessTokenDto,
} from './dto/user.dto';

@Injectable()
@UseFilters(new TrpcExceptionFilter())
export class UserRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly userService: UserService,
  ) {}
  apply() {
    return {
      userRouter: this.trpcService.trpc.router({
        // login user
        login: this.trpcService.trpc.procedure
          .input(UserLoginDto)
          .mutation(async ({ input }) => {
            return this.userService.login(input);
          }),

        // signs up a user
        signup: this.trpcService.trpc.procedure
          .input(UserSignupDto)
          .mutation(async ({ input }) => {
            return this.userService.signup(input);
          }),

        // remove user
        remove: this.trpcService.trpc.procedure
          .input(UserRemoveDto)
          .mutation(async ({ input }) => {
            return this.userService.remove(input.id);
          }),

        // get user by id
        findById: this.trpcService.trpc.procedure
          .input(UserFindByIdDto)
          .query(async ({ input }) => {
            return this.userService.findById(input.id);
          }),

        // get all users
        findAll: this.trpcService.trpc.procedure
          .input(UserFindAllDto)
          .query(async ({}) => {
            return this.userService.findAll();
          }),

        // get user by id
        verifyAccessToken: this.trpcService.trpc.procedure
          .input(UserVerifyAccessTokenDto)
          .query(async ({ input }) => {
            return this.userService.verifyAccessToken(input.accessToken);
          }),

        // reset user password
        resetPassword: this.trpcService.trpc.procedure
          .input(UserResetPasswordDto)
          .mutation(async ({ input }) => {
            return this.userService.resetPassword({ email: input.email });
          }),
      }),
    };
  }
}
