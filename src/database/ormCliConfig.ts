import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CreateCourseTable1704841911699 } from 'src/migrations/1704841911699-CreateCourseTable';
import { CreateTagsTable1704843280081 } from 'src/migrations/1704843280081-CreateTagsTable';
import { AddTimestampCollumnTag1704843443853 } from 'src/migrations/1704843443853-AddTimestampCollumnTag';
import { CreateCoursesTagsRelationshipTable1704985697543 } from 'src/migrations/1704985697543-CreateCoursesTagsRelationshipTable';
import { AddRelationCollumnCoursesTagsTable1704986494041 } from 'src/migrations/1704986494041-AddRelationCollumnCoursesTagsTable';
import { Course } from 'src/courses/entities/courses.entity';
import { Tag } from 'src/courses/entities/tags.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Course, Tag],
  synchronize: false,
};

console.log(dataSourceOptions);

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCourseTable1704841911699,
    CreateTagsTable1704843280081,
    AddTimestampCollumnTag1704843443853,
    CreateCoursesTagsRelationshipTable1704985697543,
    AddRelationCollumnCoursesTagsTable1704986494041,
  ],
});
