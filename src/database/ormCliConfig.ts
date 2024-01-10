import { DataSource } from 'typeorm';
import { dataSourceOptions } from './database.module';
import { CreateCourseTable1704841911699 } from 'src/migrations/1704841911699-CreateCourseTable';
import { CreateTagsTable1704843280081 } from 'src/migrations/1704843280081-CreateTagsTable';
import { AddTimestampCollumnTag1704843443853 } from 'src/migrations/1704843443853-AddTimestampCollumnTag';

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCourseTable1704841911699,
    CreateTagsTable1704843280081,
    AddTimestampCollumnTag1704843443853,
  ],
});
