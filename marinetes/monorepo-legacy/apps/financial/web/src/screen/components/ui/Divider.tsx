import styled from '@emotion/styled';
import { mergeClassNames } from '@hitechline/reactools';
import { cssVar } from 'polished';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
  width?: string;
  height?: string;

  opacity?: number;
  background?: string;
}

export const Divider = ({
  width = '100%',
  height = '1px',
  opacity = 0.15,
  background = '--color-white',
  className,
  ...rest
}: Props): JSX.Element => {
  const Container = styled.div`
    width: ${width};
    height: ${height};

    opacity: ${opacity};
    background-color: ${cssVar(background)};
  `;

  return (
    <Container {...rest} className={mergeClassNames('divider', className)} />
  );
};
