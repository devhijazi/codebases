export function reduceText(text: string, maxLength = 15): string {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }

  return text;
}
