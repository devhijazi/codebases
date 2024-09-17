import { MigrationInterface, Table, QueryRunner } from 'typeorm';

export class UserCreate1643388184263 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'char(36)',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'full_name',
            type: 'varchar(255)',
          },
          {
            name: 'document',
            type: 'varchar(255)',
          },
          {
            name: 'phone',
            type: 'varchar(255)',
          },
          {
            name: 'email',
            type: 'varchar(255)',
          },
          {
            name: 'avatar',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'password',
            type: 'varchar(255)',
            isNullable: true,
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
    await queryRunner.dropTable('users');
  }
}
