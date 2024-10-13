import ListPagination from '@/components/ui/list/pagination/ListPagination';
import { Col, Row } from 'antd';
import { DEFAULT_PARTIAL_LOAD_LIMIT, DEFAULT_PARTIAL_LOAD_PAGE, partialLoad } from '@/api/server-api';
import GoodsPageActions from '@/components/ui/GoodsPageActions';
import React from 'react';
import GoodCardItem from '@/components/ui/list/item/GoodCardItem';

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
                  <GoodCardItem item={item} />
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