import { Global, css } from '@emotion/react';

import 'react-toastify/dist/ReactToastify.css';

import './css/root.css';
import './css/main.css';
import './css/class.css';

export const GlobalStyle = (): JSX.Element => (
  <Global
    styles={css`
      body,
      #layout {
        background-color: var(--color-main-background);
      }

      body::-webkit-scrollbar-track {
        background-color: #c7d3ea;
      }

      body::-webkit-scrollbar {
        width: 10px;
        background-color: #c7d3ea;
      }

      body::-webkit-scrollbar-thumb {
        background-color: var(--color-favorite);
      }

      .infinite-scroll-component__outerdiv {
        width: 100%;
      }

      .scrollbar-custom {
        &::-webkit-scrollbar {
          width: var(--scrollbar-width);
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background-color: var(--color-favorite);
        }

        &::-webkit-scrollbar-track {
          border-radius: 999px;
          background-color: rgba(0, 0, 0, 0.05);
          &:hover {
            background-color: rgba(0, 0, 0, 0.2);
          }
        }
      }
    `}
  />
);
