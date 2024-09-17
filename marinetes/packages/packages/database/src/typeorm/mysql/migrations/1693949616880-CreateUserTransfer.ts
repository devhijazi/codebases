import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUserTransfer1693949616880 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_transfer',
        columns: [
          {
            name: 'id',
            type: 'char(36)',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'asaas_transfer_id',
            type: 'varchar(255)',
          },
          {
            name: 'total_value',
            type: 'int',
          },
          {
            name: 'net_value',
            type: 'int',
          },
          {
            name: 'trasnsfer_fee',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'operation_type',
            type: 'varchar(255)',
          },
          {
            name: 'status',
            type: 'varchar(255)',
          },
          {
            name: 'pix_data_id',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'bank_data_id',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'user_id',
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
      'user_transfer',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user_transfer');

    if (table) {
      const foreignKey = table.foreignKeys.find(
        ({ columnNames }) => columnNames.indexOf('user_id') !== -1,
      );

      if (foreignKey) {
        await queryRunner.dropForeignKey('user_transfer', foreignKey);
      }
    }

    await queryRunner.dropTable('user_transfer');
  }
}
