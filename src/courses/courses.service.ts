import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { CreateCourseDTO } from './dto/createCourse.dto';
import { UpdateCourseDTO } from './dto/updateCourse.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async findById(id: number): Promise<Course> {
    return this.notFoundCourseValidation(id);
  }

  async create(createCourseDTO: CreateCourseDTO): Promise<Course> {
    const tags = await Promise.all(
      createCourseDTO.tags.map((name) => this.preloadTagByName(name)),
    );
    const newCourse: Course = this.courseRepository.create({
      ...createCourseDTO,
      tags,
    });

    return this.courseRepository.save(newCourse);
  }

  async update(id: number, updateCourseDTO: UpdateCourseDTO): Promise<Course> {
    const tags =
      updateCourseDTO.tags.length &&
      (await Promise.all(
        updateCourseDTO.tags.map((name) => this.preloadTagByName(name)),
      ));

    const course = await this.courseRepository.preload({
      ...updateCourseDTO,
      tags,
      id,
    });

    if (!course) throw new NotFoundException(`Course id ${id} not found`);

    return this.courseRepository.save(course);
  }

  async delete(id: number) {
    const course = await this.notFoundCourseValidation(id);

    return this.courseRepository.remove(course);
  }

  private async notFoundCourseValidation(id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
    });

    if (!course) throw new NotFoundException(`Course id ${id} not found`);

    return course;
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { name } });

    if (tag) return tag;

    return this.tagRepository.create({ name });
  }
}
