import { z } from 'zod';

export const UserCreateDto = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
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
