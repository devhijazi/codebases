import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdatePaymentPixQRCodeField1693868961345
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'payments',
      'pix_qr_code_base64',
      new TableColumn({
        name: 'pix_qr_code_base64',
        type: 'text',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'payments',
      'pix_qr_code_base64',
      new TableColumn({
        name: 'pix_qr_code_base64',
        type: 'varchar(255)',
      }),
    );
  }
}
