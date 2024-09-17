import { MigrationInterface, Table, QueryRunner } from 'typeorm';

export class ScheduleServicesRelation1654889749996
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'schedules_services_services',
        columns: [
          {
            name: 'schedule_id',
            type: 'char(36)',
            isPrimary: true,
          },
          {
            name: 'service_id',
            type: 'char(36)',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['schedule_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'schedules',
          },
          {
            columnNames: ['service_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'services',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('schedules_services_services');
  }
}
