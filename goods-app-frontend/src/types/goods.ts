import { UploadFile } from 'antd';

export type Good = {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  article: string;
  photo: UploadFile | null;
}

export type GoodResponse = {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  article: string;
  photo: string | null;
}

export type GoodWithPartialId = Omit<Good, 'id'> & { id?: number };

export type Goods = Good[]