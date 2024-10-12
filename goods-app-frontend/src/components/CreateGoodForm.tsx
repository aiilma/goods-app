"use client";

import { useRouter } from 'next/navigation';
import { useCreateGoodMutation } from '@/hooks/use-create-good-mutation';
import React, { useState } from 'react';
import { Button, Form, Input, notification, Upload, UploadFile } from 'antd';
import Card from 'antd/lib/card/Card';
import { GoodWithPartialId } from '@/types/goods';
import { UploadChangeParam } from 'antd/es/upload/interface';
import GoodActions from '@/components/GoodActions';

export default function CreateGoodForm() {
  const createGoodMutation = useCreateGoodMutation();
  const router = useRouter();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmit = async (good: GoodWithPartialId<UploadChangeParam>) => {
    try {
      const createdGood = await createGoodMutation.mutateAsync(good);

      notification.success({
        message: 'Товар успешно создан',
      });

      router.push(`/goods/${createdGood.id}`);
    } catch (error) {
      notification.error({
        message: 'Ошибка создания товара',
      });
    }
  };

  return (
    <Card title={'Добавить товар'} bordered={false} style={{
      width: '50%',
      textAlign: 'center',
    }}>
      <GoodActions />
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Название" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Описание" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Цена" name="price">
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Цена со скидкой" name="discountPrice">
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Артикул" name="article">
          <Input />
        </Form.Item>
        <Form.Item label="Фото" name="photo" style={{textAlign: 'left'}}>
          <Upload
            maxCount={1}
            accept="image/*"
            fileList={fileList}
            listType="picture"
            onChange={(info) => {
              setFileList(info.fileList);
            }}
            showUploadList={{
              showRemoveIcon: false,
            }}
          >
            <Button>Загрузить</Button>
          </Upload>
        </Form.Item>
        <hr />
        <Form.Item style={{textAlign: 'right'}}>
          <Button type="primary" htmlType="submit" disabled={createGoodMutation.isPending}>
            {createGoodMutation.isPending ? 'Добавление...' : 'Добавить'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}