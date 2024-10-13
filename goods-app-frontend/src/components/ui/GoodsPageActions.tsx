'use client';

import { Button, Space } from 'antd';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function GoodsPageActions({ style, ...props }) {
  const router = useRouter();

  const handleGoToCreate = () => {
    router.push(`/goods/create`);
  };

  return (
    <Space
      direction="horizontal"
      size="middle"
      style={{ display: 'flex', justifyContent: 'flex-end', ...style }}
      {...props}
    >
      <Button type="primary" onClick={handleGoToCreate}>Создать</Button>
    </Space>
  );
}