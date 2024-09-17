import { MigrationInterface, Table, QueryRunner } from 'typeorm';

export class UserAddressCreate1643387988964 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_adresses',
        columns: [
          {
            name: 'id',
            type: 'char(36)',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'title',
            type: 'varchar(255)',
          },
          {
            name: 'type',
            type: 'varchar(255)',
          },
          {
            name: 'category',
            type: 'varchar(255)',
          },
          {
            name: 'rooms',
            type: 'int(4)',
          },
          {
            name: 'square_meters',
            type: 'decimal(8, 2)',
          },
          {
            name: 'zip_code',
            type: 'varchar(255)',
          },
          {
            name: 'state',
            type: 'varchar(255)',
          },
          {
            name: 'city',
            type: 'varchar(255)',
          },
          {
            name: 'neighborhood',
            type: 'varchar(255)',
          },
          {
            name: 'street',
            type: 'varchar(255)',
          },
          {
            name: 'number',
            type: 'int(3)',
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
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_adresses');
  }
}
