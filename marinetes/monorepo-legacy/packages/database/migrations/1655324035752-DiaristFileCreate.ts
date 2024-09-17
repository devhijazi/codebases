import { MigrationInterface, Table, QueryRunner } from 'typeorm';

export class DiaristFileCreate1655324035752 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'diarist_files',
        columns: [
          {
            name: 'id',
            type: 'char(36)',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'description',
            type: 'varchar(255)',
          },
          {
            name: 'type',
            type: 'varchar(255)',
          },
          {
            name: 'extension',
            type: 'varchar(255)',
          },
          {
            name: 'size_in_mb',
            type: 'float(7, 2)',
          },
          {
            name: 'url',
            type: 'varchar(255)',
          },
          {
            name: 'diarist_id',
            type: 'char(36)',
            isPrimary: true,
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
        foreignKeys: [
          {
            referencedTableName: 'diarists',
            columnNames: ['diarist_id'],
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('diarist_files');
  }
}
