import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { Z_INDEX } from '@screen/styles/config';

const SELECT_HEIGHT = 'var(--wai-height)';
const MAIN_PADDING = '20px';

export const Container = styled.div`
  position: relative;
  display: flex;

  width: 100%;

  flex-direction: column;
  justify-content: center;

  color: var(--text-color);

  &.disabled {
    cursor: not-allowed;
    user-select: none;
  }
`;

export const Button = styled.button`
  display: flex;
  width: 100%;
  height: 60px;

  padding: 0 20px;

  align-items: center;
  gap: 16px;

  border-radius: var(--wai-main-border-radius);

  background-color: var(--color-white);

  &[disabled] {
    pointer-events: none;
    opacity: 0.8;
  }

  .icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;

    svg {
      width: 26px;
      height: 26px;

      color: var(--icon-color, var(--color-favorite));
    }
  }
`;

export const Title = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  text-align: left;

  background-color: transparent;

  span {
    display: block;

    color: var(--label-color);
  }

  p {
    color: var(--color-grey);
  }
`;

interface ArrowIconProps {
  open: boolean;
}

export const ArrowIcon = styled(MdKeyboardArrowDown)<ArrowIconProps>`
  width: 30px;
  height: 30px;

  flex-shrink: 0;

  color: var(--color-teen-grey);

  ${({ open }) =>
    open &&
    css`
      transform: rotate(-180deg);
    `}
`;

export const Options = styled.div`
  width: 100%;
  padding: 6px 0;
  position: absolute;
  z-index: ${Z_INDEX.MAX};
  top: calc(${SELECT_HEIGHT} + 20px);

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  border-radius: var(--wai-main-border-radius);
  background-color: var(--color-white-grey);

  button {
    width: auto;
    height: auto;
    padding: ${MAIN_PADDING};

    display: flex;
    flex-direction: column;

    font-size: 15px;
    font-weight: 300;
    text-align: left;
    line-height: 17px;
    color: var(--option-text-color);

    border: none;
    outline: none;
    cursor: pointer;

    &:first-child {
      border-top-left-radius: var(--wai-main-border-radius);
      border-top-right-radius: var(--wai-main-border-radius);
    }

    &:last-child {
      border-bottom-left-radius: var(--wai-main-border-radius);
      border-bottom-right-radius: var(--wai-main-border-radius);
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

export const Error = styled.div`
  margin-top: 4px;

  color: var(--color-error);
`;
