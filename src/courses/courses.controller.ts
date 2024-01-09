import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findById(@Param() params: { id: string }) {
    return this.courseService.findById(+params.id);
  }

  @Post()
  create(
    @Body()
    body: any,
  ) {
    return this.courseService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    body: any,
  ) {
    return this.courseService.update(+id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.courseService.delete(+id);
  }
}
