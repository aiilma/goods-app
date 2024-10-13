import { NEST_SSR_API_ADDRESS } from '@/constants/api';
import { Good, PartialLoadResponse } from '@/types/goods';

export const fetchGood = async (goodId: string): Promise<Good> => {
  const response = await fetch(`${NEST_SSR_API_ADDRESS}/goods/${goodId}`, {
    cache: 'no-store',
  });
  return await response.json();
};

export const DEFAULT_PARTIAL_LOAD_PAGE = 1
export const DEFAULT_PARTIAL_LOAD_LIMIT = 10

export const partialLoad = async (page = DEFAULT_PARTIAL_LOAD_PAGE, limit = DEFAULT_PARTIAL_LOAD_LIMIT, filters = {}, sort = {}): Promise<PartialLoadResponse> => {
  const response = await fetch(`${NEST_SSR_API_ADDRESS}/goods`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      page,
      limit,
      filters,
      sort,
    }),
  });
  return await response.json();
};