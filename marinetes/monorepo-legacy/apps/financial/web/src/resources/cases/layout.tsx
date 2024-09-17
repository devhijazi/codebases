import type { FunctionComponent, NamedExoticComponent } from 'react';

export function layout(
  Component: FunctionComponent,
  Layout: FunctionComponent,
): NamedExoticComponent {
  function Main(): any {
    return (
      <Layout>
        <Component />
      </Layout>
    );
  }

  return Main as any;
}
