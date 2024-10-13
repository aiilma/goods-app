import ListPagination from '@/components/ui/list/pagination/ListPagination';
import { Col, Row, Space } from 'antd';
import { DEFAULT_PARTIAL_LOAD_LIMIT, DEFAULT_PARTIAL_LOAD_PAGE, partialLoad } from '@/api/server-api';
import Card from 'antd/lib/card/Card';
import GoodCardImage from '@/components/ui/list/GoodCardImage';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import GoodsPageActions from '@/components/ui/GoodsPageActions';
import React from 'react';

export default async function GoodsPage({
                                          searchParams,
                                        }: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams?.page ?? DEFAULT_PARTIAL_LOAD_PAGE);
  const limit = Number(searchParams?.limit ?? DEFAULT_PARTIAL_LOAD_LIMIT);
  const data = await partialLoad(page, limit);

  return (
    <main style={{ padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <GoodsPageActions style={{ marginBottom: '20px' }} />

        {
          data.total === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <h2>Нет товаров</h2>
              <p>К сожалению, нет товаров, соответствующих вашему запросу.</p>
            </div>
          ) : (<>
            <Row gutter={24} justify="start">
              {data.goods.map((item, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={8} xl={8}>
                  <Card
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{item.name}</h2>
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
                    <p style={{ fontSize: 14, color: '#666' }}>{item.description}</p>
                    <p style={{ fontSize: 16, color: '#333' }}>
                      Цена: {item.price} ₽&nbsp;
                      {item.discountPrice && (
                        <span style={{ color: '#f00', fontSize: 14 }}>
                      (скидка: {item.discountPrice} ₽)
                    </span>
                      )}
                    </p>
                    <p style={{ fontSize: 14, color: '#666' }}>Артикул: {item.article}</p>
                    <Space size="middle" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                      <EditOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
                      <DeleteOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>

            <ListPagination
              total={data.total}
              limit={limit}
              defaultCurrent={page}
              style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}
            />
          </>)
        }
      </div>
    </main>
  );
}