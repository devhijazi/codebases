import type { PropsWithChildren } from '@marinetes/types/modules/react';
import {
  useMemo,
  createRef,
  useCallback,
  createContext,
  ReactNode,
  ReactPortal,
} from 'react';
import { createPortal } from 'react-dom';

export interface PortalContextData {
  render(node: ReactNode, elementId: typeof elements[number]): ReactPortal;
  getElement(
    elementId: typeof elements[number],
  ): HTMLDivElement | null | undefined;
}

const elements = ['menus', 'modals'] as const;
const defaultContextData = {} as PortalContextData;

export const PortalContext =
  createContext<PortalContextData>(defaultContextData);

export const PortalProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const portalElements = useMemo(
    () =>
      elements.map(elementId => {
        const ref = createRef<HTMLDivElement>();
        const element = <div ref={ref} />;

        return {
          ref,
          id: elementId,
          portal: createPortal(element, document.body),
        };
      }),
    [],
  );

  const getElement = useCallback(
    (elementId: typeof elements[number]) => {
      const element = portalElements.find(({ id }) => id === elementId);

      return element?.ref.current;
    },
    [portalElements],
  );

  const render = useCallback(
    (node: ReactNode, elementId: typeof elements[number]) => {
      if (!elements.includes(elementId)) {
        throw new Error('The inserted "element Id" not exists.');
      }

      const container = getElement(elementId);

      return createPortal(node, container || document.body);
    },
    [getElement],
  );

  return (
    <PortalContext.Provider value={{ render, getElement }}>
      {children}

      {portalElements.map(({ portal }) => portal)}
    </PortalContext.Provider>
  );
};
