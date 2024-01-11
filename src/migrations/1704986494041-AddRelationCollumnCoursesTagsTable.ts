import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddRelationCollumnCoursesTagsTable1704986494041
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('courses_tags', [
      new TableColumn({
        name: 'coursesId',
        type: 'uuid',
        isNullable: true,
      }),
      new TableColumn({
        name: 'tagsId',
        type: 'uuid',
        isNullable: true,
      }),
    ]);

    await queryRunner.createForeignKeys('courses_tags', [
      new TableForeignKey({
        name: 'courses_tags_courses',
        columnNames: ['coursesId'],
        referencedTableName: 'courses',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
      new TableForeignKey({
        name: 'courses_tags_tags',
        columnNames: ['tagsId'],
        referencedTableName: 'tags',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('courses_tags', [
      new TableForeignKey({
        name: 'courses_tags_tags',
        columnNames: ['tagsId'],
        referencedTableName: 'tags',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
      new TableForeignKey({
        name: 'courses_tags_courses',
        columnNames: ['coursesId'],
        referencedTableName: 'courses',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    ]);
    await queryRunner.dropColumns('courses_tags', ['tags', 'coursesId']);
  }
}
