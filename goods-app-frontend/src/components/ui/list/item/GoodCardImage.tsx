'use client';

import { Image } from 'antd';
import { NEST_CSR_PHOTOS_ADDRESS } from '@/constants/api';
import { useState } from 'react';

export default function GoodCardImage({ src, alt, ...props }) {
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    setIsError(true);
  };

  return (
    <div style={{
      minHeight: '150px',
    }}>
      {src && !isError? (
        <Image
          src={`${NEST_CSR_PHOTOS_ADDRESS}/${src}`}
          alt={alt}
          style={{ width: '100%', height: '150px', objectFit: 'cover' }}
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