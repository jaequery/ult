import { Injectable, UseFilters } from '@nestjs/common';
import { TrpcExceptionFilter } from '@server/trpc/trpc.exception-handler';
import { TrpcService } from '@server/trpc/trpc.service';
import { UserService } from '@server/user/user.service';
import { Roles } from '@shared/interfaces';
import type { AnyRouter } from '@trpc/server';
import {
  UserCreateDto,
  UserFindAllDto,
  UserFindByIdDto,
  UserLoginDto,
  UserRemoveDto,
  UserResetPasswordDto,
  UserSignupDto,
  UserUpdateDto,
  UserVerifyAccessTokenDto,
} from './user.dto';

@Injectable()
@UseFilters(new TrpcExceptionFilter())
export class UserRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly userService: UserService,
  ) {}
  apply(): { userRouter: AnyRouter } {
    return {
      userRouter: this.trpcService.trpc.router({
        // login user
        login: this.trpcService
          .publicProcedure()
          .input(UserLoginDto)
          .mutation(async ({ input }) => {
            return this.userService.login(input);
          }),

        // signs up a user
        signup: this.trpcService
          .publicProcedure()
          .input(UserSignupDto)
          .mutation(async ({ input }) => {
            return this.userService.signup(input);
          }),

        // creates a user from dashboard
        create: this.trpcService
          .protectedProcedure([Roles.Admin])
          .input(UserCreateDto)
          .mutation(async ({ input }) => {
            return this.userService.create(input);
          }),

        // update user
        update: this.trpcService
          .protectedProcedure()
          .input(UserUpdateDto)
          .mutation(async ({ input, ctx }) => {
            return this.userService.update(input, ctx.user);
          }),

        // remove user
        remove: this.trpcService
          .protectedProcedure([Roles.Admin, Roles.User])
          .input(UserRemoveDto)
          .mutation(async ({ input, ctx }) => {
            return this.userService.remove(input.id, ctx.user);
          }),

        // get user by id
        findById: this.trpcService
          .protectedProcedure()
          .input(UserFindByIdDto)
          .query(async ({ input }) => {
            return this.userService.findById(input.id);
          }),

        // get all users
        findAll: this.trpcService
          .protectedProcedure([Roles.Admin])
          .input(UserFindAllDto)
          .query(async ({ input }) => {
            return this.userService.findAll(input);
          }),

        // get user by id
        verifyAccessToken: this.trpcService
          .publicProcedure()
          .input(UserVerifyAccessTokenDto)
          .query(async ({ input }) => {
            return this.userService.verifyAccessToken(input.accessToken);
          }),

        // reset user password
        resetPassword: this.trpcService
          .publicProcedure()
          .input(UserResetPasswordDto)
          .mutation(async ({ input }) => {
            return this.userService.resetPassword({ email: input.email });
          }),
      }),
    };
  }
}
