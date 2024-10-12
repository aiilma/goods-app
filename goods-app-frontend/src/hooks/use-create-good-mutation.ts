import { useMutation } from '@tanstack/react-query';
import { GoodWithPartialId } from '@/types/goods';
import * as clientApi from '@/api/client-api';
import { UploadChangeParam } from 'antd/es/upload/interface';

export const useCreateGoodMutation = () => {
  return useMutation({
    mutationFn: (good: GoodWithPartialId<UploadChangeParam>) => {
      return clientApi.createGood(good)
    }
  })
};