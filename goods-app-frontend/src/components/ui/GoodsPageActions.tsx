'use client';

import { Button, Space } from 'antd';
import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import FullScreenSpinner from '@/components/ui/FullScreenSpinner';

type GoodsPageActionsProps = {
  style?: React.CSSProperties | undefined
}
export default function GoodsPageActions({ style, ...props }: GoodsPageActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleGoToCreate = () => {
    startTransition(() => {
      router.push(`/goods/create`);
    });
  };

  return (<>
    {isPending && <FullScreenSpinner />}
    <Space
      direction="horizontal"
      size="middle"
      style={{ display: 'flex', justifyContent: 'flex-end', ...style }}
      {...props}
    >
      <Button type="primary" onClick={handleGoToCreate} disabled={isPending}>
        Создать товар
      </Button>
    </Space>
  </>);
}