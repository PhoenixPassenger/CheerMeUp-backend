import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

class CreateRecommendation1593829877266 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'recommendations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'string',
            isNullable: false,
          },
          {
            name: 'content',
            type: 'string',
            isNullable: false,
          },
          {
            name: 'client_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'store_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'recommendations',
      new TableForeignKey({
        columnNames: ['client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'recommendations',
      new TableForeignKey({
        columnNames: ['store_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'stores',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('recommendations');
  }
}

export default CreateRecommendation1593829877266;
