'use client';
import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';

export default function ({ sourceContent }) {
  return (
    <MDXRemote
      {...sourceContent}
      components={{
        a: (props) => {
          const { href, children } = props;

          if (href.startsWith('/')) {
            return <Link href={href}>{children}</Link>;
          } else if (href.startsWith('#')) {
            return <a {...props} />;
          }

          return <a target="_blank" {...props} />;
        },
      }}
    />
  );
}
