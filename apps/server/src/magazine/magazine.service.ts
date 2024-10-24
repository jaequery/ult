import { Injectable } from '@nestjs/common';
import { OpenaiService } from '@server/openai/openai.service';
import { PrismaService } from '@server/prisma/prisma.service';
import {
  MagazineCreateDtoType,
  MagazineFindAllDtoType,
  MagazineUpdateDtoType,
} from './magazine.dto';

@Injectable()
/**
 * MagazineService handles CRUD operations for categories.
 *
 * Provides methods for creating, updating, finding, deleting categories.
 * Also includes methods for magazine reactions, comments, and categories.
 */
export class MagazineService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly openaiService: OpenaiService,
  ) {}

  /**
   * Creates a new magazine.
   *
   * @param magazineCreateDto - The data for the new magazine.
   * @param requestUser - The user creating the magazine.
   * @returns The created magazine.
   */
  async create(magazineCreateDto: MagazineCreateDtoType) {
    const magazine = await this.prismaService.magazine.create({
      data: {
        ...magazineCreateDto,
      },
    });
    return magazine;
  }

  /**
   * Updates an existing magazine.
   *
   * @param magazineUpdateDto - The data to update the magazine with.
   * @returns The updated magazine.
   * @throws UnauthorizedException if the user is not allowed to update the magazine.
   * @throws InternalServerErrorException on unknown errors.
   */
  async update(magazineUpdateDto: MagazineUpdateDtoType) {
    const magazine = await this.findById(magazineUpdateDto.id);
    const updatedMagazine = await this.prismaService.magazine.update({
      where: {
        id: magazine.id,
      },
      data: { ...magazineUpdateDto },
    });
    return updatedMagazine;
  }

  /**
   * Finds all categories.
   *
   * @param opts - Options for pagination, filtering, etc.
   * @returns A paginated list of categories.
   */
  async findAll(opts: MagazineFindAllDtoType) {
    const name = opts.name;

    const records = await this.prismaService.magazine.findMany({
      skip: (opts.page - 1) * opts.perPage,
      take: opts.perPage,
      where: {
        name,
      },
      orderBy: [
        {
          year: 'desc',
        },
        {
          month: 'desc',
        },
      ],
    });
    const total = await this.prismaService.magazine.count();
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
   * Finds a magazine by ID.
   *
   * @param id - The ID of the magazine to find.
   * @returns The magazine with the given ID.
   */
  async findById(id: number) {
    return this.prismaService.magazine.findFirstOrThrow({
      where: { id },
    });
  }

  /**
   * Removes one or more categories by ID.
   *
   * Accepts a single magazine ID or an array of magazine IDs.
   * Checks if the requesting user is allowed to delete the magazine.
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
        await this.prismaService.magazine.delete({
          where: {
            id,
          },
        }),
      );
    }
    return output;
  }

  async sourcePdf(magazineId: number) {
    const magazine = await this.findById(magazineId);
    if (magazine?.pdfFileUrl) {
      const categories = await this.prismaService.category.findMany();
      const categoriesStr = JSON.stringify(
        categories.map((category) => {
          return { category: category.name, id: category.id };
        }),
      );
      if (!magazine.pdfFileUrl) return false;
      const question = `Given the context, create a list of blog articles and split them into categories that fits our blog categories: ${categoriesStr}.
      Retrieve as many articles as possible for each categories. Remember categoryId should be the id of the category from the list of blog categories. For description, be as descriptive as possible from the given context - longer the better so ideally 10000 to 50000 words.
      JSON format should look like this:
        [
          {
            "categoryId": "Category ID",
            "category": "Name of category",
            "title": "Title of the article",
            "description": "Description of the article in simple HTML format, it should be atleast 10000 to 50000 words",
            "teaser": "Teaser of the article in plain text, it should be atleast 50 to 100 words",
          },
          {...and so on...}
        ]
        `;
      const answer = await this.openaiService.askPdf(
        'magazines',
        magazineId,
        magazine.pdfFileUrl,
        question,
      );

      // save to extractedPosts in magazine
      if (answer) {
        await this.prismaService.magazine.update({
          where: { id: magazineId },
          data: { extractedPosts: answer },
        });
      }

      return answer;
    }
  }
}
