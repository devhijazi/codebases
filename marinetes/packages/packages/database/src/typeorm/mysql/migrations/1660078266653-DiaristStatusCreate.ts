import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class DiaristStatusCreate1660078266653 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'diarist_status',
        columns: [
          {
            name: 'id',
            type: 'char(36)',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'type',
            type: 'varchar(255)',
          },
          {
            name: 'approved',
            type: 'boolean',
          },
          {
            name: 'disable_date',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'disable_reason',
            type: 'varchar(255)',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('diarist_status');
  }
}
