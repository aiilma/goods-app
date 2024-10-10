import React from 'react';

export default function GoodPage({ params }: {
  params: {
    goodId: string
  }
}) {
  const goodId = params.goodId

  return (
    <div>
      <h1>Page for good: {goodId}</h1>
    </div>
  );
}