'use client';

import React, { useTransition } from 'react';
import { Button, notification, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { useDeleteGoodMutation } from '@/hooks/use-delete-good-mutation';
import { Good } from '@/types/goods';

type GoodActionsProps = {
  goodId?: Good['id'];
}

export default function GoodActions(props: GoodActionsProps) {
  const { goodId } = props;
  const router = useRouter();
  const deleteMutation = useDeleteGoodMutation();
  const [isPending, startTransition] = useTransition();

  const handleGoBack = () => {
    if (goodId) {
      router.push('/goods');
    } else {
      router.back();
    }
  };

  const handleGoToEdit = () => {
    startTransition(() => {
      router.push(`/goods/${goodId!}/edit`);
    })
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(goodId!);

      notification.success({
        message: 'Товар успешно удален',
      });

      router.push(`/goods`);
      router.refresh()
    } catch (error) {
      notification.error({
        message: 'Ошибка удаления товара',
      });
    }
  };

  return (
    <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
      <Button type="primary" onClick={handleGoBack}>{goodId ? 'В каталог' : 'Назад'}</Button>
      {
        goodId && (<>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button style={{ marginLeft: 8 }} onClick={handleGoToEdit} disabled={isPending}>
              {isPending ? <Spin /> : 'Редактировать'}
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={handleDelete} color="danger" variant="solid" disabled={deleteMutation.isPending}>
              Удалить
            </Button>
          </div>
        </>)
      }
    </div>
  );
}