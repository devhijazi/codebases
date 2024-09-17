import { useWizard } from '@hitechline/react-wizard';
import { useMemo, useCallback, Fragment } from 'react';

import { Container, BarContainer, Bar, Break, InfoContainer } from './styles';

export interface WizardHeaderProps {
  full?: boolean;
  titles: string[];
}

export function WizardHeader({ full, titles }: WizardHeaderProps): JSX.Element {
  const { count, current } = useWizard();

  const hasSelected = useCallback(
    (index: number) => index === current,
    [current],
  );

  const hasActive = useCallback(
    (index: number) => index !== current && current > index,
    [current],
  );

  const data = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        index,
        indexSum: index + 1,
      })),
    [count],
  );

  return (
    <Container>
      <BarContainer>
        {full
          ? data.map(({ indexSum }) => (
              <Fragment key={indexSum}>
                <Break active />

                {indexSum < count && <Bar active />}
              </Fragment>
            ))
          : data.map(({ index, indexSum }) => {
              const active = hasActive(index);

              return (
                <Fragment key={indexSum}>
                  <Break active={active || hasSelected(index)} />

                  {indexSum < count && <Bar active={active} />}
                </Fragment>
              );
            })}
      </BarContainer>

      {!full && (
        <InfoContainer>
          <h4>{titles[current]}</h4>
        </InfoContainer>
      )}
    </Container>
  );
}
