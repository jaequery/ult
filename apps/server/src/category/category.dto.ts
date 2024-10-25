import { z } from 'zod';

export const CategoryCreateDto = z.object({
  name: z.string(),
  sortOrder: z.number().optional(),
  parentId: z.number().optional(),
});
export type CategoryCreateDtoType = z.infer<typeof CategoryCreateDto>;

export const CategoryUpdateDto = z.object({
  id: z.number(),
  name: z.string().optional(),
  sortOrder: z.number().optional(),
  parentId: z.number().optional(),
  adminWriteOnly: z.boolean().default(true),
  singlePostOnly: z.boolean().default(false),
});
export type CategoryUpdateDtoType = z.infer<typeof CategoryUpdateDto>;

export const CategoryRemoveDto = z.object({
  id: z.array(z.number()),
});
export type CategoryRemoveDtoType = z.infer<typeof CategoryRemoveDto>;

export const CategoryFindAllDto = z.object({
  page: z.number().default(1),
  perPage: z.number().default(10),
  name: z.string().optional(),
  parentId: z.number().optional(),
});
export type CategoryFindAllDtoType = z.infer<typeof CategoryFindAllDto>;

export const CategoryFindByIdDto = z.object({
  id: z.number(),
});
export type CategoryFindByIdDtoType = z.infer<typeof CategoryFindByIdDto>;
