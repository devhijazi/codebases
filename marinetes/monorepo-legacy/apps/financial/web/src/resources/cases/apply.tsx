import type { FunctionComponent, NamedExoticComponent } from 'react';

type Component = FunctionComponent<any>;

interface ApplyData {
  layout?: Component;
  cases?: Component[];
}

export function apply(
  Component: Component,
  { layout: Layout, cases = [] }: ApplyData,
): NamedExoticComponent {
  function Applyed(): any {
    if (Layout) {
      return (
        <Layout>
          {Array.from({ length: cases.length }, (_, i) => i)
            .reverse()
            .reduce((children, index) => {
              const Case = cases[index];

              return <Case>{children}</Case>;
            }, <Component />)}
        </Layout>
      );
    }

    return Array.from({ length: cases.length }, (_, i) => i)
      .reverse()
      .reduce((children, index) => {
        const Case = cases[index];

        return <Case>{children}</Case>;
      }, <Component />);
  }

  return Applyed as any;
}
