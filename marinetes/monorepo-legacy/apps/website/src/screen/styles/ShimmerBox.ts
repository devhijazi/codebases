import styled from '@emotion/styled';

export const ShimmerBox = styled.div`
  animation: shimmer 2s infinite;
  background: linear-gradient(to right, #f0f0f0 4%, #e8e8e8 25%, #f0f0f0 36%);
  background-size: 100rem 100%;

  @keyframes shimmer {
    0% {
      background-position: -100rem 0;
    }

    100% {
      background-position: 100rem 0;
    }
  }
`;
