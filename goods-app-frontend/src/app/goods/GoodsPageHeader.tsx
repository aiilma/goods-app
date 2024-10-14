'use client';

import React from 'react';
import { Row, Col, Button, Card } from 'antd';
import GoodsPageActions from '@/components/ui/GoodsPageActions';
import GoodsListFiltersForm from '@/components/forms/FilterGoodsListForm/GoodsListFiltersForm';
import { PartialLoadResponse } from '@/types/goods';

const FILTERS_VISIBLE_KEY = `GOODS_APP_LIST_PAGE_filtersVisible`;

const useFiltersVisibility = () => {
  const [isFiltersVisible, setIsFiltersVisible] = React.useState(false);
  const mountedRef = React.useRef(false);

  React.useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem(FILTERS_VISIBLE_KEY);
        setIsFiltersVisible(storedValue === 'true');
      }
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(FILTERS_VISIBLE_KEY, isFiltersVisible.toString());
    }
  }, [isFiltersVisible]);

  return { isFiltersVisible, setIsFiltersVisible };
};

type GoodsPageHeaderProps = {
  availablePriceRange: PartialLoadResponse['availablePriceRange'];
  style?: React.CSSProperties;
}
export default function GoodsPageHeader({ availablePriceRange, style }: GoodsPageHeaderProps) {
  const { isFiltersVisible, setIsFiltersVisible } = useFiltersVisibility();

  const handleToggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  return (
    <Row gutter={[16, 16]} style={{ ...style }}>
      <Col span={24}>
        <Row justify="space-between" align="middle">
          <Col>
            <Button type="link" onClick={handleToggleFilters}>
              {isFiltersVisible ? 'Скрыть фильтры' : 'Фильтры'}
            </Button>
          </Col>
          <Col>
            <GoodsPageActions />
          </Col>
        </Row>
      </Col>
      {isFiltersVisible && (
        <Col span={24}>
          <Card bordered>
            <GoodsListFiltersForm availablePriceRange={availablePriceRange} />
          </Card>
        </Col>
      )}
    </Row>
  );
}