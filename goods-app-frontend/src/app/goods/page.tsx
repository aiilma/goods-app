import ListPagination from '@/components/ui/list/pagination/ListPagination';
import { Col, Row } from 'antd';
import { DEFAULT_PARTIAL_LOAD_LIMIT, DEFAULT_PARTIAL_LOAD_PAGE, partialLoad } from '@/api/server-api';

export default async function GoodsPage({
                                          searchParams,
                                        }: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams?.page ?? DEFAULT_PARTIAL_LOAD_PAGE);
  const limit = Number(searchParams?.limit ?? DEFAULT_PARTIAL_LOAD_LIMIT);
  const data = await partialLoad(page, limit);

  return (
    <main>
      <Row gutter={24}>
        {data.goods.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
            {item.name}
          </Col>
        ))}
      </Row>

      <ListPagination total={data.total} limit={limit} defaultCurrent={page} />
    </main>
  );
}