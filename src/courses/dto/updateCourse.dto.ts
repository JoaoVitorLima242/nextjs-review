import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDTO } from './createCourse.dto';

export class UpdateCourseDTO extends PartialType(CreateCourseDTO) {}
