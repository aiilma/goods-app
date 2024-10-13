import ListPagination from '@/components/ui/list/pagination/ListPagination';
import { DEFAULT_PARTIAL_LOAD_LIMIT, DEFAULT_PARTIAL_LOAD_PAGE, partialLoad } from '@/api/server-api';
import GoodsPageActions from '@/components/ui/GoodsPageActions';
import React from 'react';
import GoodsList from '@/components/ui/list/GoodsList';

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
            <GoodsList goods={data.goods} />

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