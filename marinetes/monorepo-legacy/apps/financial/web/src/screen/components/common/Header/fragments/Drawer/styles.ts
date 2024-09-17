import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { rgba, cssVar } from 'polished';
import { Link } from 'react-router-dom';

import { Z_INDEX } from '@screen/styles/config';

const MAIN_PADDING = '8px';

const paddingCSS = css`
  padding-left: ${MAIN_PADDING};
  padding-right: ${MAIN_PADDING};
  padding-top: ${MAIN_PADDING};
  padding-bottom: ${MAIN_PADDING};
`;

export const Container = styled(motion.div)`
  display: flex;
  position: fixed;

  z-index: ${Z_INDEX.MASTER};
  width: 100%;
  height: 100vh;
  max-width: 280px;

  top: 0;
  left: 0;
  flex-direction: column;

  color: var(--color-favorite);
  background-color: var(--color-white-grey);
  box-shadow: var(--main-right-box-shadow);
`;

export const Header = styled.section`
  ${paddingCSS};
  position: relative;
  display: flex;

  align-items: center;
  justify-content: center;

  img {
    width: 40px;
    height: auto;
  }

  button {
    display: flex;
    position: absolute;
    right: ${MAIN_PADDING};

    svg {
      width: 2.25rem;
      height: auto;
      transition: transform 300ms;
    }

    &:hover svg {
      opacity: 0.85;
      transform: rotate(180deg);
    }
  }
`;

export const Content = styled.section`
  flex-grow: 1;

  &::-webkit-scrollbar-thumb {
    background-color: ${rgba(cssVar('--color-light-favorite', '#ffff'), 0.4)};
  }

  > div {
    display: flex;
    flex-direction: column;
    width: 100%;

    gap: 8px;
    justify-content: center;
  }
`;

export const Button = styled(Link)`
  ${paddingCSS};

  display: flex;
  width: 100%;

  text-align: center;
  align-items: center;

  gap: 1rem;

  border: 1px solid transparent;

  &:hover {
    border-color: var(--color-favorite);
    background-color: var(--color-favorite);
    color: var(--color-white);

    > svg {
      color: var(--color-white);
    }
  }

  span {
    margin-top: 6px;
    font-size: 1.5rem;
    font-weight: 500;
  }
`;
