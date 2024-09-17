import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class DiaristBankDataCreate1660082002206 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'diarist_bankdata',
        columns: [
          {
            name: 'id',
            type: 'char(36)',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'bank_number',
            type: 'varchar(255)',
          },
          {
            name: 'bank_name',
            type: 'varchar(255)',
          },
          {
            name: 'agency',
            type: 'varchar(255)',
          },
          {
            name: 'account',
            type: 'varchar(255)',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('diarist_bankdata');
  }
}
