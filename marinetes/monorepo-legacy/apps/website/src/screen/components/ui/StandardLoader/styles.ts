import styled from '@emotion/styled';

export const Container = styled.div`
  position: fixed;

  display: flex;

  width: 100vw;
  height: 100vh;

  z-index: 4444;
  top: 0;
  left: 0;

  align-items: center;
  justify-content: center;

  background-color: rgba(255, 255, 255, 0.5);
`;

export const SpinnerContainer = styled.div`
  padding: 20px;

  border-radius: var(--wai-main-border-radius);

  box-shadow: var(--box-shadow);

  > span {
    display: block;

    width: 60px;
    height: 60px;

    border: 4px solid rgba(255, 255, 255, 0.2);
    border-left: 4px solid hsl(89, 52%, 49%);
    border-radius: 50%;

    animation: spinner 300ms linear infinite;

    @keyframes spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
