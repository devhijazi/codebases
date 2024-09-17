import { MigrationInterface, Table, QueryRunner } from 'typeorm';

export class UserAddressRelation1643400094899 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_addresses_user_addresses',
        columns: [
          {
            name: 'user_id',
            type: 'char(36)',
            isPrimary: true,
          },
          {
            name: 'address_id',
            type: 'char(36)',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            referencedTableName: 'users',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
          },
          {
            referencedTableName: 'user_adresses',
            columnNames: ['address_id'],
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_addresses_user_addresses');
  }
}
