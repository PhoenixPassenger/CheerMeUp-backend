import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateRating1593829843327 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'ratings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'score',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'comment',
            type: 'text',
            isNullable: true,
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
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'ratings',
      new TableForeignKey({
        name: 'RatingClient',
        columnNames: ['client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'ratings',
      new TableForeignKey({
        name: 'RatingStore',
        columnNames: ['store_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'stores',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ratings');
    await queryRunner.dropForeignKey('ratings', 'RatingStore');
    await queryRunner.dropForeignKey('ratings', 'RatingClient');
    await queryRunner.dropColumn('ratings', 'store_id');
    await queryRunner.dropColumn('ratings', 'client_id');
  }
}
