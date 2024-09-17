import styled from '@emotion/styled';

interface Props {
  color?: string;
  textColor?: string;
  iconColor?: string;
}

export const Container = styled.div<Props>`
  margin: 10px 0;

  input {
    display: none;
  }

  label {
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    color: var(--color-white);
  }

  input + label:before {
    content: '';
    width: 18px;
    height: 18px;
    border-radius: 4px;
    background: white;
    display: inline-block;
    vertical-align: middle;
    margin-right: 8px;
    margin-bottom: 3px;
  }

  input:checked + label:before {
    background-image: ${({ iconColor = '#FFFFFF' }) =>
      iconColor &&
      `url('data:image/svg+xml,%3Csvg version="1.2" baseProfile="tiny-ps" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 406 406" width="10" height="10"%3E%3Ctitle%3Econfirm-svg%3C/title%3E%3Cstyle%3E tspan %7B white-space:pre %7D .s0 %7B fill: ${
        iconColor.includes('#') ? `%23${iconColor.split('#')[1]}` : iconColor
      } %7D %3C/style%3E%3Cg id="Layer"%3E%3Cpath id="Layer" class="s0" d="m393.4 124.42l-213.8 213.78c-15.83 15.83-41.51 15.83-57.36 0l-110.36-110.37c-15.84-15.84-15.84-41.52 0-57.36c15.84-15.84 41.52-15.84 57.36-0.01l81.7 81.7l185.11-185.11c15.84-15.84 41.52-15.83 57.36 0c15.84 15.84 15.84 41.51 0.01 57.36z" /%3E%3C/g%3E%3Cg id="Layer"%3E%3C/g%3E%3Cg id="Layer"%3E%3C/g%3E%3Cg id="Layer"%3E%3C/g%3E%3Cg id="Layer"%3E%3C/g%3E%3Cg id="Layer"%3E%3C/g%3E%3Cg id="Layer"%3E%3C/g%3E%3Cg id="Layer"%3E%3C/g%3E%3Cg id="Layer"%3E%3C/g%3E%3Cg id="Layer"%3E%3C/g%3E%3Cg id="Layer"%3E%3C/g%3E%3Cg id="Layer"%3E%3C/g%3E%3Cg id="Layer"%3E%3C/g%3E%3Cg id="Layer"%3E%3C/g%3E%3Cg id="Layer"%3E%3C/g%3E%3Cg id="Layer"%3E%3C/g%3E%3C/svg%3E')`};
    background-color: ${({ color }) => color || '#7FBD3B'};
    background-position: center;
    background-repeat: no-repeat;
    border: none;
  }
`;
