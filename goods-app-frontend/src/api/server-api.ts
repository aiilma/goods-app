import { GoodResponse } from '@/types/goods';
import { NEST_SSR_API_ADDRESS } from '@/constants/api';

export const fetchGood = async (goodId: string): Promise<GoodResponse> => {
  const response = await fetch(`${NEST_SSR_API_ADDRESS}/goods/${goodId}`);
  return response.json();
};