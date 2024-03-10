import { z } from 'zod';

export const PostCreateDto = z.object({
  title: z.string(),
  description: z.string().optional(),
});
export type PostCreateDtoType = z.infer<typeof PostCreateDto>;

export const PostUpdateDto = z.object({
  id: z.number(),
  title: z.string().optional(),
  teaser: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
});
export type PostUpdateDtoType = z.infer<typeof PostUpdateDto>;

export const PostRemoveDto = z.object({
  id: z.array(z.number()),
});
export type PostRemoveDtoType = z.infer<typeof PostRemoveDto>;

export const PostFindAllDto = z.object({
  page: z.number().default(1),
  perPage: z.number().default(10),
});
export type PostFindAllDtoType = z.infer<typeof PostFindAllDto>;

export const PostFindByIdDto = z.object({
  id: z.number(),
});
export type PostFindByIdDtoType = z.infer<typeof PostFindByIdDto>;
