'use client';

import React, { useState } from 'react';
import { Button, Form, Input, Layout, notification, Upload, UploadFile } from 'antd';
import { useCreateGoodMutation } from '@/hooks/use-create-good-mutation';
import { useRouter } from 'next/navigation';

const { Content } = Layout;

export default function CreateGoodPage() {
  const createGoodMutation = useCreateGoodMutation();
  const router = useRouter();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmit = async (values) => {
    try {
      const newGood = {
        ...values
      }

      if (values.photo && values.photo.file) {
        newGood.photo = values.photo.file
      }

      const createdGood = await createGoodMutation.mutateAsync(newGood);
      notification.success({
        message: 'Товар успешно создан',
      });

      router.push(`/goods/${createdGood.id}`)
    } catch (error) {
      notification.error({
        message: 'Ошибка создания товара',
      });
    }

  };

  return (
    <Layout style={{ padding: '20px' }}>
      <Content>
        <h1>Добавить товар</h1>
        <Form layout="vertical" onFinish={handleSubmit} >
          <Form.Item label="Название" name="name">
            <Input/>
          </Form.Item>
          <Form.Item label="Описание" name="description">
            <Input.TextArea/>
          </Form.Item>
          <Form.Item label="Цена" name="price">
            <Input type="number"/>
          </Form.Item>
          <Form.Item label="Цена со скидкой" name="discountPrice">
            <Input type="number"/>
          </Form.Item>
          <Form.Item label="Артикул" name="article">
            <Input/>
          </Form.Item>
          <Form.Item label="Фото" name="photo">
            <Upload
              multiple={false}
              maxCount={1}
              accept="image/*"
              fileList={fileList}
              onChange={(info) => {
                setFileList(info.fileList);
              }}
            >
              <Button>Загрузить фото</Button>
            </Upload>
          </Form.Item>
          <hr />
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={createGoodMutation.isPending}>
              {createGoodMutation.isPending ? 'Добавление...' : 'Добавить'}
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}