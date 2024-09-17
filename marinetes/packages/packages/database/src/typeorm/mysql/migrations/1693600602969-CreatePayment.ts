import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePayment1693600602969 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payments',
        columns: [
          {
            name: 'id',
            type: 'char(36)',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'asaas_payment_id',
            type: 'varchar(255)',
          },
          {
            name: 'method',
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
            name: 'status',
            type: 'varchar(255)',
          },
          {
            name: 'pix_qr_code_base64',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'pix_copy_and_paste',
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
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payments');
  }
}
