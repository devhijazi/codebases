import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateUserWallet1693851347405 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_wallet',
        columns: [
          {
            name: 'id',
            type: 'char(36)',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'balance_available',
            type: 'int',
          },
          {
            name: 'blocked_balance',
            type: 'int',
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

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'wallet_id',
        type: 'char(36)',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['wallet_id'],
        referencedTableName: 'user_wallet',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('users');

    if (table) {
      const foreignKey = table.foreignKeys.find(
        ({ columnNames }) => columnNames.indexOf('wallet_id') !== -1,
      );

      if (foreignKey) {
        await queryRunner.dropForeignKey('users', foreignKey);
      }
    }

    await queryRunner.dropColumn('users', 'wallet_id');

    await queryRunner.dropTable('user_wallet');
  }
}
