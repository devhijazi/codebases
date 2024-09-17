import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateDiaristBankData1693573429993 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'diarist_bank_data',
        columns: [
          {
            name: 'id',
            type: 'char(36)',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'account_name',
            type: 'varchar(255)',
          },
          {
            name: 'owner_name',
            type: 'varchar(255)',
          },
          {
            name: 'document',
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
          {
            name: 'account_digit',
            type: 'varchar(255)',
          },
          {
            name: 'bank_account_type',
            type: 'varchar(255)',
          },
          {
            name: 'diarist_id',
            type: 'char(36)',
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
      'diarist_bank_data',
      new TableForeignKey({
        columnNames: ['diarist_id'],
        referencedTableName: 'diarists',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('diarist_bank_data');

    if (table) {
      const foreignKey = table.foreignKeys.find(
        ({ columnNames }) => columnNames.indexOf('diarist_id') !== -1,
      );

      if (foreignKey) {
        await queryRunner.dropForeignKey('diarist_bank_data', foreignKey);
      }
    }

    await queryRunner.dropTable('diarist_bank_data');
  }
}
