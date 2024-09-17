interface Data {
  id: string;
  title: string;
}

export function makePostUID({ id, title }: Data): string {
  return `${title
    .normalize('NFD')
    .trim()
    .toLowerCase()
    .replace(/[ÁÀÂÃ]/gi, 'a')
    .replace(/[ÉÈÊ]/gi, 'e')
    .replace(/[ÍÌÎ]/gi, 'i')
    .replace(/[ÓÒÔÕ]/gi, 'o')
    .replace(/[ÚÙÛ]/gi, 'u')
    .replace(/[Ç]/gi, 'c')
    .replace(/[^A-Z0-9 ]/gi, '')
    .split(/ +/)
    .join('-')}__${id}`;
}
