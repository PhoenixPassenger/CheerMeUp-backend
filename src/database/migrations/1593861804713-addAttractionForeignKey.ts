import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class addAttractionForeignKey1593861804713
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'attractions',
      new TableColumn({
        name: 'attraction_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'attractions',
      new TableForeignKey({
        name: 'AttractionSchedule',
        columnNames: ['attraction_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'schedules',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('attractions', 'AttractionSchedule');

    await queryRunner.dropColumn('attractions', 'attraction_id');
  }
}
