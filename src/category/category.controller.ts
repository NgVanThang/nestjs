import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CategoryService } from '../category';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dtos/category.dto';
import { Category } from '@prisma/client';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly CategoryService: CategoryService
    ) { }

    @Get()
    getList() {
        return this.CategoryService.getList();
    }

    @Post('create')
    create(@Body() data: CreateCategoryDTO): Promise<Category> {
        return this.CategoryService.create(data);
    }

    @Put('update/:id')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateCategoryDTO): Promise<Category> {
        return this.CategoryService.update(id, data);
    }

    @Delete('delete/:id')
    destroy(@Param('id', ParseIntPipe) id: number) {
        return this.CategoryService.delete(id);
    }
}
