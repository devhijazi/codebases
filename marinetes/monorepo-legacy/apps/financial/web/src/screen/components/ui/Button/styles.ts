import styled from '@emotion/styled';

export const Container = styled.button`
  cursor: pointer;

  width: 100%;
  height: 40px;
  max-width: var(--wai-max-width);

  padding: 25px;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 20px;

  font-size: 16px;
  font-weight: 700;
  color: var(--color-white);

  border-radius: 10px;
  transition: background 0.4s;
  background-color: var(--color-light-favorite);

  &:disabled {
    cursor: not-allowed;
    background-color: rgba(var(--color-light-favorite-rgb), 0.5);
  }

  svg {
    flex-shrink: 0;
  }
`;
