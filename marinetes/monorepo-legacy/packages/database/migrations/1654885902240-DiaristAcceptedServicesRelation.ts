import { MigrationInterface, Table, QueryRunner } from 'typeorm';

export class DiaristAcceptedServicesRelation1654885902240
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'diarists_accepted_services_services',
        columns: [
          {
            name: 'diarist_id',
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
            columnNames: ['diarist_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'diarists',
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
    await queryRunner.dropTable('diarists_accepted_services_services');
  }
}
