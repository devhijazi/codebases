export function convertDecimalToUnit(value: number): number {
  return Math.round(value * 100);
}

export function convertUnitToDecimal(value: number): number {
  return toDecimal(value / 100);
}

export function toDecimal(value: number): number {
  return Number(value.toFixed(2));
}
