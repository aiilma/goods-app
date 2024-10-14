import React from 'react';
import { fetchGood } from '@/api/server-api';
import Paragraph from 'antd/lib/typography/Paragraph';
import Card from 'antd/lib/card/Card';
import GoodActions from '@/components/GoodActions';
import GoodCardImage from '@/components/ui/list/item/GoodCardImage';

export default async function GoodPage({ params }: {
  params: {
    goodId: string
  }
}) {
  const goodId = params.goodId;
  const good = await fetchGood(goodId);

  return (
    <Card title={good.name} bordered={false} style={{
      width: '50%',
      textAlign: 'center',
    }}>
      <GoodActions goodId={good.id} />
      {good.photo && (
        <GoodCardImage
          src={good.photo}
          alt={good.name}
          preview={false}
          style={{
            width: '100%',
            height: 'auto',
            marginBottom: '20px',
          }}
        />
      )}
      <Paragraph>{good.description}</Paragraph>
      <Paragraph>Цена: {good.price}₽</Paragraph>
      <Paragraph>Цена со скидкой: {good.discountPrice}₽</Paragraph>
      <Paragraph>Артикул: {good.article}</Paragraph>
    </Card>
  );
}