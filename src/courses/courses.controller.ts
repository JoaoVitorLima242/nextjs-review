import { Controller, Get, Param } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Get()
  findAll() {
    return 'Course List';
  }

  @Get(':id')
  findById(@Param() params: { id: string }) {
    return 'Course ' + params.id;
  }
}
