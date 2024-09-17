import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface BarActiveProps {
  active: boolean;
}

const barCSS = css`
  width: 100%;
  height: 10px;

  background-color: var(--overlay-color);

  transition-delay: 1s;
  transition: background-color 200ms;
`;

export const Container = styled.header`
  --overlay-color: var(--color-white-grey);
  --active: hsl(89 52% 49%);
`;

export const BarContainer = styled.div`
  width: 100%;
  margin-top: -3px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const BaseBar = styled.span<BarActiveProps>`
  ${barCSS};

  ${({ active }) =>
    active &&
    css`
      background-color: var(--active) !important;
    `}
`;

export const MainBar = styled(BaseBar)`
  flex-grow: 1;

  &.first {
    border-top-left-radius: 999px;
    border-bottom-left-radius: 999px;
  }

  &.last {
    border-top-right-radius: 999px;
    border-bottom-right-radius: 999px;
  }
`;

export const Bar = styled(BaseBar)`
  max-width: 200px;
`;

export const Break = styled.div<BarActiveProps>`
  z-index: 2;
  width: 18px;
  height: 18px;

  flex-shrink: 0;

  border-radius: 50%;
  box-shadow: 0 0 0 4px var(--overlay-color);
  background-color: var(--overlay-color);

  ${({ active }) =>
    active &&
    css`
      box-shadow: 0 0 0 4px var(--active) !important;
      background-color: var(--active) !important;
    `}
`;

export const InfoContainer = styled.div`
  --padding: 10px;

  margin-top: 8px;
  padding: var(--padding) 0 var(--padding) 0;

  h4 {
    font-size: 22px;
    font-weight: normal;
  }
`;
