import axios from 'axios';
import { Good, GoodWithPartialId } from '@/types/goods';
import { NEST_CSR_API_ADDRESS } from '@/constants/api';
import { UploadChangeParam } from 'antd/es/upload/interface';

export const apiClient = axios.create({
  baseURL: `${NEST_CSR_API_ADDRESS}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createGood = async ({ photo, ...good }: GoodWithPartialId<UploadChangeParam>): Promise<Good> => {
  const photoFile = photo && photo.file;

  const formData = new FormData();

  if (photoFile && photoFile.originFileObj) {
    const file = new File([photoFile.originFileObj], photoFile.name, {
      type: photoFile.type,
    });

    formData.append('photo', file);
  }

  formData.append('good', JSON.stringify(good));

  const response = await apiClient.post('/goods/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const deleteGood = async (id) => {
  const response = await apiClient.delete(`/goods/${id}`);
  return response.data;
};