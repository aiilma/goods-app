import { NEST_SSR_API_ADDRESS } from '@/constants/api';
import { Good } from '@/types/goods';

export const fetchGood = async (goodId: string): Promise<Good> => {
  const response = await fetch(`${NEST_SSR_API_ADDRESS}/goods/${goodId}`, {
    cache: 'no-store',
  });
  return await response.json();
};