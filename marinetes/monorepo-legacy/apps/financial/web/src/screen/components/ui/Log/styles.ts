import styled from '@emotion/styled';

interface ContainerProps {
  index: number;
}

export const Container = styled.div<ContainerProps>`
  background: ${({ index }) => (index % 2 === 0 ? '#FFFFFF' : '#EEEEEE')};

  height: 50px;
  padding: 15px;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    h3 {
      font-size: 15px;
      font-weight: normal;
      color: #bbbbbb;
    }

    p {
      font-size: 15px;
      font-weight: normal;
    }
  }
`;

export const ArrowRight = styled.img`
  margin: 0 24px;
  width: 16px;
  height: 14px;
`;

ArrowRight.defaultProps = {
  src: '/assets/icons/arrow-right.svg',
};

export const Message = styled.p`
  font-size: 15px;
  font-weight: normal;
`;
