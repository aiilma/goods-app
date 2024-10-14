'use client';

import { Button, Space } from 'antd';
import React from 'react';
import { useRouter } from 'next/navigation';

type GoodsPageActionsProps = {
  style?: React.CSSProperties | undefined
}
export default function GoodsPageActions({ style, ...props }: GoodsPageActionsProps) {
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
      <Button type="primary" onClick={handleGoToCreate}>Создать товар</Button>
    </Space>
  );
}