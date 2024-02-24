import { z } from 'zod';

export const UserLoginDto = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type UserLoginDtoType = z.infer<typeof UserLoginDto>;

export const UserCreateDto = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  gender: z.string().optional(),
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
