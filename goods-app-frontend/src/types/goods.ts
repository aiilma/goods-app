export type Good<P = string | null> = {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  article: string;
  photo: P;
}

export type GoodWithPartialId<P = string | null> = Omit<Good<P>, 'id'> & { id?: number };

export type Goods = Good[]

export type PartialLoadRequest = {
  page?: number
  limit?: number
  filters?: { field: keyof Omit<Good, 'id' | 'photo'>; value: string }[]
  sort?: { field?: keyof Omit<Good, 'photo'>; order?: 'ASC' | 'DESC' }
}

export type PartialLoadResponse = {
  goods: Goods;
  total: number;
}