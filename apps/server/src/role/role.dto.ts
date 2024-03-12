import { z } from 'zod';

export const RoleCreateDto = z.object({
  name: z.string(),
});
export type RoleCreateDtoType = z.infer<typeof RoleCreateDto>;

export const RoleUpdateDto = z.object({
  id: z.number(),
  name: z.string(),
});
export type RoleUpdateDtoType = z.infer<typeof RoleUpdateDto>;

export const RoleRemoveDto = z.object({
  id: z.array(z.number()),
});
export type RoleRemoveDtoType = z.infer<typeof RoleRemoveDto>;

export const RoleFindAllDto = z.object({
  page: z.number().default(1),
  perPage: z.number().default(10),
});
export type RoleFindAllDtoType = z.infer<typeof RoleFindAllDto>;

export const RoleFindByIdDto = z.object({
  id: z.number(),
});
export type RoleFindByIdDtoType = z.infer<typeof RoleFindByIdDto>;
