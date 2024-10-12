import React from 'react';
import EditGoodForm from '@/components/EditGoodForm';
import { fetchGood } from '@/api/server-api';

export default async function EditGoodPage({ params }: {
  params: {
    goodId: string
  }
}) {
  const goodId = params.goodId;
  const good = await fetchGood(goodId);

  return (
    <EditGoodForm initialValues={good} goodId={good.id} />
  );
}