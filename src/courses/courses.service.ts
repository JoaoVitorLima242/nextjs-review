import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './courses.entity';
import { CreateCourseDTO } from './dto/createCourse.dto';
import { UpdateCourseDTO } from './dto/updateCourse.dto';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'NestJS',
      description: 'NestJS course',
      tags: ['Node', 'Nest'],
    },
  ];

  findAll(): Course[] {
    return this.courses;
  }

  findById(id: number): Course {
    const course = this.notFoundCourseValidation(id);

    return course;
  }

  create(createCourseDTO: CreateCourseDTO) {
    this.courses.push({ id: this.courses.length + 1, ...createCourseDTO });
  }

  update(id: number, updateCourseDTO: UpdateCourseDTO): void {
    const existingCourse = this.findById(id);

    if (existingCourse) {
      const index = this.courses.findIndex((course) => id === course.id);

      this.courses[index] = {
        id,
        ...updateCourseDTO,
      };
    }
  }

  delete(id: number) {
    const index = this.courses.findIndex((course) => id === course.id);

    if (index >= 0) {
      this.courses.splice(index, 1);
    }
  }

  private notFoundCourseValidation(id: number): Course {
    const course = this.courses.find((course) => id === course.id);

    if (!course) throw new NotFoundException(`Course id ${id} not found`);

    return course;
  }
}
