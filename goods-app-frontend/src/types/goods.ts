export type Good = {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  article: string;
  photo: string | null;
}

export type Goods = Good[]