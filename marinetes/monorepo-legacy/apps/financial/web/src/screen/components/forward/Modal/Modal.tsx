import { useOutClick } from '@hitechline/reactools';
import {
  ForwardRefComponent,
  HTMLMotionProps,
  AnimatePresence,
} from 'framer-motion';
import {
  useState,
  useEffect,
  forwardRef,
  useCallback,
  useImperativeHandle,
  Ref,
} from 'react';

import { usePortal } from '@resources/hooks/usePortal';
import { BlockUIStyle } from '@screen/styles/BlockUIStyle';

import { Container, Content } from './styles';
import type { ModalHandles } from './types';

type SectionProps = Parameters<
  ForwardRefComponent<HTMLElement, HTMLMotionProps<'section'>>
>[0];

interface Props extends SectionProps {
  onClose?(): any;
}

export const Modal = forwardRef(
  (
    { children, onClose, ...props }: Props,
    ref: Ref<ModalHandles>,
  ): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const { render } = usePortal();
    const {
      addListener,
      removeListener,
      ref: contentRef,
    } = useOutClick<HTMLElement>();

    const handle = useCallback(() => {
      setIsOpen(currentOpenValue => !currentOpenValue);
    }, []);

    const open = useCallback(() => {
      setTimeout(() => {
        setIsOpen(true);
      }, 0);
    }, []);

    const close = useCallback(() => {
      if (!isOpen) {
        return;
      }

      onClose?.();
      setIsOpen(false);
    }, [isOpen, onClose]);

    useEffect(() => {
      addListener(close);

      return () => {
        removeListener(close);
      };
    }, [close, addListener, removeListener]);

    useImperativeHandle(
      ref,
      () => ({
        open,
        close,
        handle,
      }),
      [open, close, handle],
    );

    return render(
      <AnimatePresence>
        {isOpen && (
          <>
            <BlockUIStyle />

            <Container
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              initial={{
                opacity: 0,
                backgroundColor: 'rgba(0, 0, 0, 0)',
              }}
              animate={{
                opacity: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
              }}
            >
              <Content
                {...props}
                ref={contentRef}
                animate={{ y: 0 }}
                initial={{ y: -30 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {children}
              </Content>
            </Container>
          </>
        )}
      </AnimatePresence>,
      'modals',
    );
  },
);

Modal.displayName = 'Modal';
