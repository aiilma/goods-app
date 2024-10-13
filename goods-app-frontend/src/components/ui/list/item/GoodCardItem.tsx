import React from 'react';
import Card from 'antd/lib/card/Card';
import GoodCardImage from '@/components/ui/list/GoodCardImage';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Space, Button } from 'antd';
import { Good } from '@/types/goods';
import styles from './styles.module.css';

type GoodCardItemProps = {
  item: Good
}

export default function GoodCardItem(props: GoodCardItemProps) {
  const { item } = props;

  return (
    <Card
      title={
        <div className={styles.cardTitle}>
          <h2 className={styles.cardTitleH2}>{item.name}</h2>
        </div>
      }
      bordered={false}
      style={{
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '20px 20px 5px',
        borderRadius: '10px',
        marginBottom: '20px',
      }}
    >
      {item.photo && (
        <GoodCardImage src={item.photo} alt={item.name} preview={false} />
      )}
      <p className={styles.cardDescription}>{item.description}</p>
      <p className={styles.cardPrice}>
        Цена: {item.price} ₽&nbsp;
        {item.discountPrice && (
          <span className={styles.cardDiscountPrice}>
            (скидка: {item.discountPrice} ₽)
          </span>
        )}
      </p>
      <p className={styles.cardArticle}>Артикул: {item.article}</p>
      <Space size="middle" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
        <Button
          type="link"
          icon={<EditOutlined />}
          className={styles.editButton}
          title={'Редактировать'}
        />
        <Button
          type="link"
          icon={<DeleteOutlined />}
          className={styles.deleteButton}
          title={'Удалить'}
        />
      </Space>
    </Card>
  );
}