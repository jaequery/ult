import { Roles } from '@shared/interfaces';
import { z } from 'zod';

export const UserLoginDto = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
export type UserLoginDtoType = z.infer<typeof UserLoginDto>;

export const UserSignupDto = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().optional(),
});
export type UserSignupDtoType = z.infer<typeof UserSignupDto>;

export const UserCreateDto = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string(),
  lastName: z.string(),
  roles: z.array(z.nativeEnum(Roles)).optional(),
  phone: z.string().optional(),
  gender: z.string().optional(),
  bio: z.string().optional(),
  profilePicUrl: z.string().optional(),
});
export type UserCreateDtoType = z.infer<typeof UserCreateDto>;

export const UserUpdateDto = z.object({
  id: z.number(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  username: z.string(),
  roles: z.array(z.nativeEnum(Roles)).optional(),
  email: z.string().email(),
  password: z
    .string()
    // .min(8, 'Password must be at least 8 characters')
    .optional(),
  phone: z.string().optional(),
  gender: z.string().optional(),
  bio: z.string().optional(),
  profilePicUrl: z.string().optional(),
});
export type UserUpdateDtoType = z.infer<typeof UserUpdateDto>;

export const UserRemoveDto = z.object({
  id: z.array(z.number()),
});
export type UserRemoveDtoType = z.infer<typeof UserRemoveDto>;

export const UserFindAllDto = z.object({
  page: z.number().default(1),
  perPage: z.number().default(10),
  search: z.string().optional(),
});
export type UserFindAllDtoType = z.infer<typeof UserFindAllDto>;

export const UserFindByIdDto = z.object({
  id: z.number(),
});
export type UserFindByIdDtoType = z.infer<typeof UserFindByIdDto>;

export const UserVerifyAccessTokenDto = z.object({
  accessToken: z.string(),
});
export type UserVerifyAccessTokenType = z.infer<
  typeof UserVerifyAccessTokenDto
>;

export const UserResetPasswordDto = z.object({
  email: z.string().email(),
});
export type UserResetPasswordType = z.infer<typeof UserResetPasswordDto>;
