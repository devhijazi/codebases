import {
  MigrationInterface,
  TableColumn,
  TableForeignKey,
  QueryRunner,
} from 'typeorm';

export class DiaristStripeIntegrationRelation1667420208397
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'diarists',
      new TableColumn({
        name: 'stripe_integration_id',
        type: 'char(36)',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'diarists',
      new TableForeignKey({
        referencedTableName: 'diarist_stripe_integration',
        columnNames: ['stripe_integration_id'],
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
  }
}
