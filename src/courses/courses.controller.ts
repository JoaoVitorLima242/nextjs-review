import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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

  @Post()
  create(
    @Body()
    body: {
      id: number;
      name: string;
      description: string;
      tags: string[];
    },
  ) {
    return body;
  }
}
