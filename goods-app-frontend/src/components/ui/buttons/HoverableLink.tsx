"use client";

import Link from 'next/link';
import styles from './styles.module.css';

function HoverableLink({ children, href }) {
  return (
    <Link href={href} className={styles.hoverableLink}>
      {children}
    </Link>
  );
}

export default HoverableLink;