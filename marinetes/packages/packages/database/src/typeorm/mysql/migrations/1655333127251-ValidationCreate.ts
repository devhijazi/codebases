import { MigrationInterface, Table, QueryRunner } from 'typeorm';

export class ValidationCreate1655333127251 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'validations',
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
            name: 'validation',
            type: 'varchar(255)',
          },
          {
            name: 'subject',
            type: 'varchar(255)',
          },
          {
            name: 'expiration_time_in_minutes',
            type: 'int(6)',
          },
          {
            name: 'created_timestamp',
            type: 'bigint(20)',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('validations');
  }
}
