declare module 'nested-object-assign' {
  function assign(...objects: Record<string, any>[]): Record<string, any>;

  export = assign;
}
