import { PrismaService } from '../prisma/prisma.service';
import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dtos/category.dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    create = async (dataCreate: CreateCategoryDTO) => {
        try {
            const category = await this.prisma.category.create({
                data: {
                    name: dataCreate.name,
                    status: dataCreate.status
                }
            });

            return category;
        } catch (error) {
            throw new InternalServerErrorException(`Failed to create category: ${error.message}`);
        }
    }

    update = async (id: number, dataUpdate: UpdateCategoryDTO): Promise<Category> => {
        try {
            const category = await this.prisma.category.findFirst({
                where: {
                    id: id,
                },
            });

            if (!!!category) {
                throw new InternalServerErrorException('Category not found');
            }

            const updatedCategory = await this.prisma.category.update({
                where: { id: id },
                data: dataUpdate,
            });

            return updatedCategory;
        } catch (error) {
            // Handle the error appropriately
            throw new InternalServerErrorException(`Failed to update category: ${error.message}`);
        }
    };

    delete = async (id: number) => {
        try {
            const category = await this.prisma.category.findFirst({
                where: { id }
            });

            if (!!!category) {
                throw new InternalServerErrorException('Category not found');
            }

            await this.prisma.category.delete({
                where: { id }
            });
        } catch (error) {
            throw new InternalServerErrorException(`Failed to update category: ${error.message}`);
        }
    }

    getList = async () => {
        try {
            const categories = await this.prisma.category.findMany();

            return {
                data: categories
            };
        } catch (error) {
            throw new InternalServerErrorException(`Failed to update category: ${error.message}`);
        }
    }
}
