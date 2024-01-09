import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';

interface Course {
  id: number;
  name: string;
  description: string;
  tags: string[];
}

@Controller('courses')
export class CoursesController {
  @Get()
  findAll(@Res() response) {
    return response.status(200).json({
      message: 'Courses List',
    });
  }

  @Get(':id')
  findById(@Param() params: { id: string }) {
    return 'Course ' + params.id;
  }

  @Post()
  create(
    @Body()
    body: Course,
  ) {
    return body;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    body: Course,
  ) {
    return 'update course id: ' + id + ' body: ' + JSON.stringify(body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return 'delete course id: ' + id;
  }
}
