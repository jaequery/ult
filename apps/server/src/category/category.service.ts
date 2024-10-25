import { Injectable } from '@nestjs/common';
import { PrismaService } from '@server/prisma/prisma.service';
import {
  CategoryCreateDtoType,
  CategoryFindAllDtoType,
  CategoryUpdateDtoType,
} from './category.dto';

@Injectable()
/**
 * CategoryService handles CRUD operations for categories.
 *
 * Provides methods for creating, updating, finding, deleting categories.
 * Also includes methods for category reactions, comments, and categories.
 */
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Creates a new category.
   *
   * @param categoryCreateDto - The data for the new category.
   * @param requestUser - The user creating the category.
   * @returns The created category.
   */
  async create(categoryCreateDto: CategoryCreateDtoType) {
    const category = await this.prismaService.category.create({
      data: categoryCreateDto,
    });
    return category;
  }

  /**
   * Updates an existing category.
   *
   * @param categoryUpdateDto - The data to update the category with.
   * @returns The updated category.
   * @throws UnauthorizedException if the user is not allowed to update the category.
   * @throws InternalServerErrorException on unknown errors.
   */
  async update(categoryUpdateDto: CategoryUpdateDtoType) {
    const category = await this.findById(categoryUpdateDto.id);
    const updatedCategory = await this.prismaService.category.update({
      where: {
        id: category.id,
      },
      data: { ...categoryUpdateDto },
    });
    return updatedCategory;
  }

  /**
   * Finds all categories.
   *
   * @param opts - Options for pagination, filtering, etc.
   * @returns A paginated list of categories.
   */
  async findAll(opts: CategoryFindAllDtoType) {
    const name = opts.name;

    const records = await this.prismaService.category.findMany({
      skip: (opts.page - 1) * opts.perPage,
      take: opts.perPage,
      where: {
        name,
        parentId: opts.parentId ?? undefined,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });
    const total = await this.prismaService.category.count();
    const lastPage = Math.ceil(total / opts.perPage);
    return {
      records,
      total,
      currentPage: opts.page,
      lastPage,
      perPage: opts.perPage,
    };
  }

  /**
   * Finds a category by ID.
   *
   * @param id - The ID of the category to find.
   * @returns The category with the given ID.
   */
  async findById(id: number) {
    return this.prismaService.category.findFirstOrThrow({
      where: { id },
    });
  }

  /**
   * Removes one or more categories by ID.
   *
   * Accepts a single category ID or an array of category IDs.
   * Checks if the requesting user is allowed to delete the category.
   * Marks the categories as deleted by setting deletedAt.
   *
   * @param id - The ID or IDs of the categories to delete.
   * @returns The updated categories.
   */
  async remove(id: number | number[]) {
    let ids: number[] = [];
    if (id instanceof Array) {
      ids = id;
    } else if (typeof id === 'number') {
      ids = [id];
    }
    const output = [];
    for (const id of ids) {
      output.push(
        await this.prismaService.category.delete({
          where: {
            id,
          },
        }),
      );
    }
    return output;
  }
}
