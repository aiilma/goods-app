import { useMutation } from '@tanstack/react-query';
import { GoodWithPartialId } from '@/types/goods';
import * as clientApi from '@/api/client-api';

export const useCreateGoodMutation = () => {
  return useMutation({
    mutationFn: (newGood: GoodWithPartialId) => {
      return clientApi.createGood(newGood)
    }
  })
};