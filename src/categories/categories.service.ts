import { Injectable } from '@nestjs/common';
import CreateCategoryDto from './dto/create-category.dto';
import Category from './categories.entity';
import UpdateCategoryDto from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CategoryNotFoundException from './exception/categoryNotFound.exception';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  getAllCategories(): Promise<Category[]> {
    return this.categoriesRepository.find({ relations: ['posts'] });
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['posts'],
    });

    if (!category) {
      throw new CategoryNotFoundException(id);
    }

    return category;
  }

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoriesRepository.create(category);
    return this.categoriesRepository.save(newCategory);
  }

  async updateCategory(
    id: number,
    category: UpdateCategoryDto,
  ): Promise<Category> {
    await this.categoriesRepository.update(id, category);
    return this.getCategoryById(id); // This will throw CategoryNotFoundException if the category is not found
  }

  async deleteCategory(id: number): Promise<void> {
    const deleteResponse = await this.categoriesRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new CategoryNotFoundException(id);
    }
  }
}
