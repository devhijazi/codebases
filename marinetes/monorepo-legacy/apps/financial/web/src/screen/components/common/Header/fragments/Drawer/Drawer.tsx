import { useOutClick } from '@hitechline/reactools';
import { AnimatePresence } from 'framer-motion';
import {
  useState,
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
  Ref,
  useMemo,
} from 'react';
import { FiX } from 'react-icons/fi';

import { drawerLinks } from '@resources/data/links';
import { AlphaStyle } from '@screen/styles/AlphaStyle';

import { Container, Header, Content, Button } from './styles';
import type { Handles } from './types';

export const Drawer = forwardRef((_props, ref: Ref<Handles>): JSX.Element => {
  const {
    addListener,
    removeListener,
    ref: outClickRef,
  } = useOutClick<HTMLDivElement>();

  const [visible, setVisible] = useState(false);

  const links = useMemo(
    () =>
      drawerLinks.map(({ href, title, icon: Icon }) => (
        <Button key={title} to={href} className="break-word">
          <Icon size="2.5rem" />

          <span>{title}</span>
        </Button>
      )),
    [],
  );

  const open = useCallback(() => {
    setTimeout(() => {
      setVisible(true);
    }, 0);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const handleOutClick = useCallback(() => {
    if (!visible) {
      return;
    }

    close();
  }, [visible, close]);

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close],
  );

  useEffect(() => {
    addListener(handleOutClick);

    return () => {
      removeListener(handleOutClick);
    };
  }, [addListener, removeListener, handleOutClick]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          <AlphaStyle base="MASTER" />

          <Container
            ref={outClickRef}
            transition={{ duration: 0.3 }}
            animate={{ left: 0 }}
            exit={{ left: '-100%' }}
            initial={{ left: '-100%' }}
          >
            <Header>
              <img src="/assets/logo_green.png" alt="Marinetes Logo" />

              <button type="button" onClick={close}>
                <FiX />
              </button>
            </Header>

            <Content className="scrollbar-custom">
              <div>{links}</div>
            </Content>
          </Container>
        </>
      )}
    </AnimatePresence>
  );
});

Drawer.displayName = 'Drawer';
