'use client';

import Link from 'next/link';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Spin } from 'antd';

function HoverableLink({ children, href }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (isPending) {
    return (
      <Spin tip="Loading..." className={styles.spinner} />
    );
  }

  return (
    <Link
      href={href}
      className={styles.hoverableLink}
      onClick={(e) => {
        e.preventDefault();
        startTransition(() => {
          const url = href.toString();
          router.push(url);
        });
      }}
    >
      {children}
    </Link>
  );
}

export default HoverableLink;