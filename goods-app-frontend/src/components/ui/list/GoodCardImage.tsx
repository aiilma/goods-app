"use client"

import { Image } from 'antd';
import { NEST_CSR_PHOTOS_ADDRESS } from '@/constants/api';

export default function GoodCardImage({ src, alt, ...props }) {
  return (
    <Image
      src={`${NEST_CSR_PHOTOS_ADDRESS}/${src}`}
      alt={alt}
      style={{ width: '100%', height: '150px', objectFit: 'cover' }}
      {...props}
    />
  );
}