export function splitAndReduceText(text: string, limit = 2): string {
  const textParsed = typeof text === 'string' ? text : '';
  const splitedText = textParsed.trim().split(/[ \t]+/);

  return splitedText.slice(0, limit).join(' ');
}

export default splitAndReduceText;
