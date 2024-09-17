import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { Z_INDEX } from '@screen/styles/config';

export const Container = styled(motion.div)`
  position: fixed;
  display: flex;

  z-index: ${Z_INDEX.MAX};

  width: 100vw;
  height: 100vh;

  top: 0;
  left: 0;

  align-items: center;
  justify-content: center;
`;

export const Content = styled(motion.section)`
  width: 100%;
`;
