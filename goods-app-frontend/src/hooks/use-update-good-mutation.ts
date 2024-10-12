import { useMutation } from '@tanstack/react-query';
import { Good } from '@/types/goods';
import * as clientApi from '@/api/client-api';
import { UploadChangeParam } from 'antd/es/upload/interface';

export const useUpdateGoodMutation = () => {
  return useMutation({
    mutationFn: (good: Good<UploadChangeParam>) => {
      return clientApi.updateGood(good)
    }
  })
};