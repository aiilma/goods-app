import { Goods } from '@/types/goods';
import { Col, Row } from 'antd';
import GoodCardItem from '@/components/ui/list/item/GoodCardItem';

type GoodsListProps = {
  goods: Goods;
}

export default function GoodsList(props: GoodsListProps) {
  const { goods } = props;

  return (
    <Row gutter={24} justify="start">
      {goods.map((item, index) => (
        <Col key={index} xs={24} sm={12} md={8} lg={8} xl={8}>
          <GoodCardItem item={item} />
        </Col>
      ))}
    </Row>
  );
}