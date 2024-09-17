import { useOutClick, mergeClassNames } from '@hitechline/reactools';
import {
  motion,
  AnimatePresence,
  HTMLMotionProps,
  ForwardRefComponent,
} from 'framer-motion';
import React, {
  useState,
  useEffect,
  forwardRef,
  useCallback,
  useImperativeHandle,
  Ref,
} from 'react';

import { usePortal } from '@/engine/hooks/usePortal';
import { BlockScroll } from '@/screen/styles/BlockScroll';

import styles from './styles.module.css';
import type { ModalHandles } from './types';

type SectionProps = Parameters<
  ForwardRefComponent<HTMLElement, HTMLMotionProps<'section'>>
>[0];

interface Props extends SectionProps {
  onClose?(): any;
}

export const Modal = forwardRef(
  (
    { children, onClose, className, ...props }: Props,
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
            <BlockScroll />

            <motion.div
              className={styles.container}
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
              <motion.section
                {...props}
                className={mergeClassNames(className, 'w-full')}
                ref={contentRef}
                animate={{ y: 0 }}
                initial={{ y: 60 }}
                exit={{ y: 60, opacity: 0.5 }}
                transition={{ duration: 0.4 }}
              >
                {children}
              </motion.section>
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      'modals',
    );
  },
);

Modal.displayName = 'Modal';
