import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { CreateCourseDTO } from './dto/createCourse.dto';
import { UpdateCourseDTO } from './dto/updateCourse.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}
  private courses: Course[] = [
    {
      id: 1,
      name: 'NestJS',
      description: 'NestJS course',
      tags: ['Node', 'Nest'],
    },
  ];

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async findById(id: number): Promise<Course> {
    return this.notFoundCourseValidation(id);
  }

  async create(createCourseDTO: CreateCourseDTO): Promise<Course> {
    const newCourse: Course = this.courseRepository.create(createCourseDTO);

    return this.courseRepository.save(newCourse);
  }

  async update(id: number, updateCourseDTO: UpdateCourseDTO): Promise<Course> {
    const course = await this.courseRepository.preload({
      ...updateCourseDTO,
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
}
