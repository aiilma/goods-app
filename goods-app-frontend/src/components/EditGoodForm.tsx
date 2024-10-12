'use client';

import React, { useEffect, useState } from 'react';
import { Button, Form, Input, notification, Upload, UploadFile } from 'antd';
import Card from 'antd/lib/card/Card';
import { Good, GoodWithPartialId } from '@/types/goods';
import { useUpdateGoodMutation } from '@/hooks/use-update-good-mutation';
import { UploadChangeParam } from 'antd/es/upload/interface';
import { NEST_CSR_PHOTOS_ADDRESS } from '@/constants/api';
import { useForm } from 'antd/es/form/Form';
import { useRouter } from 'next/navigation';
import GoodActions from '@/components/GoodActions';

type EditGoodFormProps = {
  goodId: Good['id'];
  initialValues?: GoodWithPartialId;
}

export default function EditGoodForm({ goodId, initialValues }: EditGoodFormProps) {
  const [form] = useForm();
  const updateGoodMutation = useUpdateGoodMutation();
  const router = useRouter();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (initialValues && initialValues.photo) {
      const file: UploadFile = {
        uid: '-1',
        name: 'photo.png', //fixme сохраняется название файла, которое != начальному
        status: 'done',
        url: `${NEST_CSR_PHOTOS_ADDRESS}/${initialValues.photo}`,
      };
      form.setFieldsValue({
        photo: {
          file: file,
          fileList: [file],
        },
      });
      setFileList([file]);
    }
  }, [form, initialValues]);

  const handleSubmit = async (good: GoodWithPartialId<UploadChangeParam>) => {
    try {
      const updatedGood = await updateGoodMutation.mutateAsync({ id: goodId, ...good });

      notification.success({
        message: 'Товар успешно обновлён',
      });

      router.push(`/goods/${updatedGood.id}`)
      router.refresh()
    } catch (error) {
      notification.error({
        message: 'Ошибка обновления товара',
      });
    }
  };

  return (
    <Card title={`Редактировать товар`} bordered={false} style={{
      width: '50%',
      textAlign: 'center',
    }}>
      <GoodActions />
      <Form layout="vertical" onFinish={handleSubmit} initialValues={initialValues} form={form}>
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
        <Form.Item label="Фото" name="photo" style={{ textAlign: 'left' }}>
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
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" disabled={updateGoodMutation.isPending}>
            {updateGoodMutation.isPending ? 'Редактирование...' : 'Редактировать'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}