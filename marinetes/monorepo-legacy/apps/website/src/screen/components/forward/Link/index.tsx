import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import type { LinkHTMLAttributes } from 'react';

export type LinkProps = NextLinkProps &
  Omit<LinkHTMLAttributes<HTMLLinkElement>, keyof NextLinkProps>;

export const Link = ({
  href,
  children,
  ...props
}: PropsWithChildren<LinkProps>): JSX.Element => {
  return (
    <NextLink {...props} href={href} passHref>
      <a {...(props as any)}>{children}</a>
    </NextLink>
  );
};
