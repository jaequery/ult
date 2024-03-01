import { z } from 'zod';

export const UserLoginDto = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
export type UserLoginDtoType = z.infer<typeof UserLoginDto>;

export const UserCreateDto = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  roles: z.array(z.string()),
});
export type UserCreateDtoType = z.infer<typeof UserCreateDto>;

export const UserRemoveDto = z.object({
  id: z.number(),
});
export type UserRemoveDtoType = z.infer<typeof UserRemoveDto>;

export const UserFindAllDto = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});
export type UserFindAllDtoType = z.infer<typeof UserFindAllDto>;

export const UserFindByIdDto = z.object({
  id: z.number(),
});
export type UserFindByIdDtoType = z.infer<typeof UserFindByIdDto>;

export const UserFindByAccessToken = z.object({
  accessToken: z.string(),
});
export type UserFindByAccessTokenType = z.infer<typeof UserFindByAccessToken>;
