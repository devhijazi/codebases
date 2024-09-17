import { MigrationInterface, Table, QueryRunner } from 'typeorm';

export class DiaristCreate1643311977752 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'diarists',
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
            name: 'birthdate',
            type: 'date',
          },
          {
            name: 'document',
            type: 'varchar(255)',
          },
          {
            name: 'general_register',
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
            name: 'activated',
            type: 'boolean',
          },
          {
            name: 'accepting_services',
            type: 'boolean',
          },
          {
            name: 'avatar',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'password',
            type: 'varchar(255)',
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
    await queryRunner.dropTable('diarists');
  }
}
