import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateDiaristBankData1693949633993 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('diarist_bank_data', [
      new TableColumn({
        name: 'ispb',
        type: 'varchar(255)',
        isNullable: true,
      }),
      new TableColumn({
        name: 'bank_code',
        type: 'varchar(255)',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('diarist_bank_data', ['ispb', 'bank_code']);
  }
}
