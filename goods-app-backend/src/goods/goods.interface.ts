import { Good } from './goods.entity';

export interface PartialLoadRequest {
  page?: number;
  limit?: number;
  filters?: { field: string; value: string }[];
  sort?: { field?: string; order?: 'ASC' | 'DESC' };
}

export interface PartialLoadResponse {
  goods: Good[];
  total: number;
}