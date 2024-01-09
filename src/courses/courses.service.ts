import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
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

  create(createCourseDTO: CreateCourseDTO): Course {
    const newCourse: Course = {
      id: this.courses.length + 1,
      ...createCourseDTO,
    };
    this.courses.push(newCourse);

    return newCourse;
  }

  update(id: number, updateCourseDTO: UpdateCourseDTO): Course {
    this.notFoundCourseValidation(id);

    const index = this.courses.findIndex((course) => id === course.id);

    const updatedCourse = {
      id,
      ...this.courses[index],
      ...updateCourseDTO,
    };

    this.courses[index] = updatedCourse;

    return updatedCourse;
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
