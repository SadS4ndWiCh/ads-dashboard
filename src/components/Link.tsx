import { HTMLProps } from 'react';
import NextLink from 'next/link';

export function Link({ href, className, children, ...rest }: HTMLProps<HTMLAnchorElement>) {
  return (
    <NextLink href={href as string}>
      <a
        className={className}
        {...rest}
      >{ children }</a>
    </NextLink>
  )
}