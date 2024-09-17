import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropStripeIntegration1693233792499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('diarists');

    if (table) {
      const foreignKey = table.foreignKeys.find(
        ({ columnNames }) =>
          columnNames.indexOf('stripe_integration_id') !== -1,
      );

      if (foreignKey) {
        await queryRunner.dropForeignKey('diarists', foreignKey);
      }
    }

    await queryRunner.dropColumn('diarists', 'stripe_integration_id');

    await queryRunner.dropTable('diarist_stripe_integration');
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    //
  }
}
