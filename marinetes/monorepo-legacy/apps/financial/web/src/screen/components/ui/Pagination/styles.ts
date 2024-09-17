import styled from '@emotion/styled';

interface PageProps {
  isSelect?: boolean;
}

export const Container = styled.section`
  background: var(--color-white);
  padding: 0 10px;
  border-radius: 10px;

  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Button = styled.button`
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;

    svg {
      cursor: not-allowed;
    }
  }
`;

export const Dots = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Main = styled.div`
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const Page = styled.button<PageProps>`
  background-color: ${({ isSelect }) =>
    isSelect ? 'var(--color-light-favorite)' : 'var(--color-white-grey)'};
  color: ${({ isSelect }) =>
    isSelect ? 'var(--color-white)' : 'var(--color-black)'};
  width: 30px;
  height: 30px;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
