import { z } from 'zod';

export const CreateUserDto = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const UserFindAllDto = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export type UserFindAllDtoType = z.infer<typeof UserFindAllDto>;
