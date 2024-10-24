import { z } from "zod";

export const MagazineCreateDto = z.object({
  name: z.string(),
});
export type MagazineCreateDtoType = z.infer<typeof MagazineCreateDto>;

export const MagazineUpdateDto = z.object({
  id: z.number(),
  name: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  pdfFileUrl: z.string().optional(),
  description: z.string().optional(),
  month: z.number().optional(),
  year: z.number().optional(),
});
export type MagazineUpdateDtoType = z.infer<typeof MagazineUpdateDto>;

export const MagazineRemoveDto = z.object({
  id: z.array(z.number()),
});
export type MagazineRemoveDtoType = z.infer<typeof MagazineRemoveDto>;

export const MagazineFindAllDto = z.object({
  page: z.number().default(1),
  perPage: z.number().default(10),
  name: z.string().optional(),
});
export type MagazineFindAllDtoType = z.infer<typeof MagazineFindAllDto>;

export const MagazineFindByIdDto = z.object({
  id: z.number(),
});
export type MagazineFindByIdDtoType = z.infer<typeof MagazineFindByIdDto>;
