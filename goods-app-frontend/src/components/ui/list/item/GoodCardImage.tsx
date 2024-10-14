'use client';

import { Image, ImageProps } from 'antd';
import { NEST_CSR_PHOTOS_ADDRESS } from '@/constants/api';
import { useState } from 'react';

type GoodCardImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  src: string | null;
  alt: string;
  style?: React.CSSProperties;
  preview?: boolean;
}
export default function GoodCardImage({ src, alt, style, ...props }: GoodCardImageProps) {
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    setIsError(true);
  };

  return (
    <div style={{
      minHeight: '150px',
    }}>
      {src && !isError ? (
        <Image
          src={`${NEST_CSR_PHOTOS_ADDRESS}/${src}`}
          alt={alt}
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
            ...style,
          }}
          onError={handleError}
          {...props}
        />
      ) : (
        <div style={{
          width: '100%',
          height: '150px',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          Нет изображения
        </div>
      )}
    </div>
  );
}