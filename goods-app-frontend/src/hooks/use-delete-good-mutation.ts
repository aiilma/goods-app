import { useMutation } from '@tanstack/react-query';
import * as clientApi from '@/api/client-api';
import { Good } from '@/types/goods';

export const useDeleteGoodMutation = () => {
  return useMutation({
    mutationFn: (id: Good['id']) => {
      return clientApi.deleteGood(id)
    }
  })
};