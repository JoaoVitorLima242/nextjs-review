import { Injectable } from '@nestjs/common';
import { Course } from './courses.entity';

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
    return this.courses.find((course) => id === course.id);
  }

  create(createCourseDTO: any) {
    this.courses.push(createCourseDTO);
  }

  update(id: number, updateCourseDTO: any): void {
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
}
