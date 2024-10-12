import axios from 'axios';
import { GoodResponse, GoodWithPartialId } from '@/types/goods';
import { NEST_CSR_API_ADDRESS } from '@/constants/api';

export const apiClient = axios.create({
  baseURL: `${NEST_CSR_API_ADDRESS}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createGood = async (good: GoodWithPartialId): Promise<GoodResponse> => {
  const { photo, ...restGood } = good;
  const formData = new FormData();

  if (photo && photo.originFileObj) {
    const file = new File([photo.originFileObj], photo.name, {
      type: photo.type,
    });

    formData.append('photo', file);
  }

  formData.append('good', JSON.stringify(restGood));

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