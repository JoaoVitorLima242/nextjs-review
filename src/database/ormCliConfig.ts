import { DataSource } from 'typeorm';
import { dataSourceOptions } from './database.module';
import { CreateCourseTable1704841911699 } from 'src/migrations/1704841911699-CreateCourseTable';

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [CreateCourseTable1704841911699],
});
