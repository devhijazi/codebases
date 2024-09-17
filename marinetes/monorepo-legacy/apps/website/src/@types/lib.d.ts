type ValueOf<T> = T[keyof T];

type AllPartial<T> = {
  [P in keyof T]?: AllPartial<T[P]>;
};

type AllRequired<T> = {
  [P in keyof T]-?: AllRequired<T[P]>;
};

type Merge<A, B> = {
  [K in keyof (A | B)]: K extends keyof B ? B[K] : A[K];
};
