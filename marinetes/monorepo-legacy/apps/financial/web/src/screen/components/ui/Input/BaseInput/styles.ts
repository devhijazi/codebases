import styled from '@emotion/styled';

interface GroupProps {
  withIcon: boolean;
}

const ICON_WIDTH = '50px';

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  > label {
    display: block;
    width: max-content;
    margin-bottom: 3px;
  }

  &.disabled {
    opacity: 0.5;

    &,
    input {
      cursor: not-allowed;
      user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }
  }
`;

export const Content = styled.div`
  width: 100%;

  position: relative;
  display: flex;

  overflow: hidden;
  border-radius: var(--wai-main-border-radius);

  .icon {
    padding: 15px;
    width: ${ICON_WIDTH};

    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--color-light-favorite) !important;

    svg {
      width: 100%;
      height: auto;

      color: var(--icon-color) !important;
    }
  }

  ${Container}.focused & {
    border-color: var(--color-favorite);

    .icon svg {
      color: var(--color-favorite) !important;
    }
  }

  ${Container}.error & {
    border-color: var(--color-error);

    .icon svg {
      color: var(--color-error) !important;
    }
  }
`;

export const Group = styled.div<GroupProps>`
  width: 100%;
  height: ${({ withIcon }) => (withIcon ? ICON_WIDTH : 'auto')};
  padding: ${({ withIcon }) =>
    withIcon ? '10px 20px 10px 10px' : '10px 20px'};

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;

  font-size: 16px;

  background-color: var(--input-background);

  > label {
    color: var(--label-color);
  }
`;

export const InputElement = styled.input`
  width: 100%;

  color: var(--input-color);

  background-color: transparent;

  ${Container}.focused & {
    color: var(--color-white);
  }

  &::placeholder {
    color: var(--input-placeholder);
  }
`;

export const Error = styled.div`
  margin-top: 10px;

  font-size: 12px;
  color: var(--color-error);

  text-transform: uppercase;

  > span {
    display: block;

    text-align: left;
  }
`;
