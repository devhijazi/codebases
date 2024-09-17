import type { QueryRunner } from 'typeorm';

interface Data {
  table: string;
  columns: string[];
}

export async function getExistingColumns(
  queryRunner: QueryRunner,
  data: Data,
): Promise<string[]> {
  const { table, columns } = data;

  const promises = columns.map(async column => {
    const hasColumn = await queryRunner.hasColumn(table, column);

    return hasColumn ? column : null;
  });

  const existingColumns = await Promise.all(promises).then(
    array => array.filter(column => typeof column === 'string') as string[],
  );

  return existingColumns;
}
