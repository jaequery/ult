import { PostReactionType } from '@prisma/client';
import { z } from 'zod';

export enum PostCategories {
  General = 'General',
  CompanyNews = 'Company News',
}

export const PostCreateDto = z.object({
  title: z.string(),
  category: z.string().optional(),
  description: z.string().optional(),
});
export type PostCreateDtoType = z.infer<typeof PostCreateDto>;

export const PostUpdateDto = z.object({
  id: z.number(),
  title: z.string().optional(),
  category: z.string().optional(),
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
  category: z.string().optional(),
});
export type PostFindAllDtoType = z.infer<typeof PostFindAllDto>;

export const PostFindByIdDto = z.object({
  id: z.number(),
});
export type PostFindByIdDtoType = z.infer<typeof PostFindByIdDto>;

export const PostReactionCreateDto = z.object({
  postId: z.number(),
  type: z.nativeEnum(PostReactionType),
});
export type PostReactionCreateDtoType = z.infer<typeof PostReactionCreateDto>;

export const PostCommentCreateDto = z.object({
  postId: z.number(),
  message: z.string().min(1, 'Message can not be empty'),
});
export type PostCommentCreateDtoType = z.infer<typeof PostCommentCreateDto>;

export const PostCommentRemoveDto = z.object({
  id: z.number(),
});
export type PostCommentRemoveDtoType = z.infer<typeof PostCommentRemoveDto>;
