'use client';

import { Button, Col, Form, Input, InputNumber, Row, Select, Slider } from 'antd';
import React from 'react';
import { PartialLoadRequest } from '@/types/goods';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const FALLBACK_PRICE_RANGE = [0, 10000];

export type FilterGoodsListFormProps = {
  availablePriceRange: [number, number];
};

export default function GoodsListFiltersForm(props: FilterGoodsListFormProps) {
  const [form] = Form.useForm();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {availablePriceRange} = props
  const initialPriceRange = availablePriceRange || FALLBACK_PRICE_RANGE
  const [priceRange, setPriceRange] = React.useState(initialPriceRange);

  React.useEffect(() => {
    if (searchParams.toString() && searchParams.get('filters')) {
      const filters = JSON.parse(searchParams.get('filters') || '[]');

      let minPrice = initialPriceRange[0];
      let maxPrice = initialPriceRange[1];
      let nameOperationType = 'string_exact';
      let name = '';

      filters.forEach((filter) => {
        if (filter.field === 'price') {
          if (filter.value.startsWith('>=')) {
            minPrice = parseInt(filter.value.substring(2), 10);
          } else if (filter.value.startsWith('<=')) {
            maxPrice = parseInt(filter.value.substring(2), 10);
          }
        } else if (filter.field === 'name') {
          if (filter.value.startsWith('=')) {
            nameOperationType = 'string_exact';
            name = filter.value.substring(1);
          } else {
            nameOperationType = 'string_like';
            name = filter.value;
          }
        }
      });

      setPriceRange([minPrice, maxPrice]);

      form.setFieldsValue({
        min_price: minPrice,
        max_price: maxPrice,
        name,
        name_searchType: nameOperationType,
      });
    }
  }, [searchParams])

  const onFinish = (values) => {
    const filters: PartialLoadRequest["filters"] = [];

    if (values.name) {
      filters.push({
        field: 'name',
        value: values.name_searchType === 'string_exact'
          ? `=${values.name}`
          : values.name
      });
    }

    if (values.min_price !== initialPriceRange[0]) {
      filters.push({
        field: 'price',
        value: `>=${values.min_price}`,
      });
    }

    if (values.max_price !== initialPriceRange[1]) {
      filters.push({
        field: 'price',
        value: `<=${values.max_price}`,
      });
    }

    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (filters.length > 0) {
      newSearchParams.set('filters', JSON.stringify(filters));
    } else {
      newSearchParams.delete('filters');
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    form.setFieldsValue({
      min_price: value[0],
      max_price: value[1],
    });
  };

  const handleMinPriceChange = (value) => {
    setPriceRange([value, priceRange[1]]);
    form.setFieldsValue({
      min_price: value,
    });
  };

  const handleMaxPriceChange = (value) => {
    setPriceRange([priceRange[0], value]);
    form.setFieldsValue({
      max_price: value,
    });
  };

  const handleReset = () => {
    form.resetFields();
    setPriceRange(initialPriceRange);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('filters');
    router.push(`${pathname}?${newSearchParams.toString()}`);
  }

  return (
    <Form
      form={form}
      name="filter-form"
      onFinish={onFinish}
      initialValues={{
        name_searchType: 'string_like',
        min_price: initialPriceRange[0],
        max_price: initialPriceRange[1],
      }}
      layout="vertical"
      style={{ padding: 20 }}
    >
      <h2>Фильтры</h2>

      <Row gutter={16} justify="space-between">
        <Col span={12}>
          {/*фильтр для названия*/}
          <Form.Item
            label="Название"
            name="name"
          >
            <Input placeholder="Введите название" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Тип поиска"
            name="name_searchType"
          >
            <Select>
              <Select.Option value={`string_exact`}>Точное совпадение</Select.Option>
              <Select.Option value={`string_like`}>Примерное совпадение</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/*фильтр для цены*/}
      <Row gutter={16} justify="space-between">
        <Col span={24}>
          <Form.Item label="Цена">
            <Row gutter={16} justify="space-between">

              <Col span={12}>
                <Form.Item
                  name="min_price"
                  noStyle
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    value={priceRange[0]}
                    onChange={handleMinPriceChange}
                    placeholder="Минимальная цена"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="max_price"
                  noStyle
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    value={priceRange[1]}
                    onChange={handleMaxPriceChange}
                    placeholder="Максимальная цена"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Slider
              range
              value={priceRange}
              onChange={handlePriceChange}
              min={initialPriceRange[0]}
              max={initialPriceRange[1]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Применить
        </Button>
        <Button style={{ marginLeft: 10 }} onClick={handleReset}>
          Сбросить
        </Button>
      </Form.Item>
    </Form>
  );
}