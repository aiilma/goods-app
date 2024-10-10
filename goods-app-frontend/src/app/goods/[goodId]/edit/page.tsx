import React from 'react';

export default function EditForm({ params }: {
  params: {
    goodId: string
  }
}) {
  const goodId = params.goodId

  return (
    <div>
      <h1>Edit Form: {goodId}</h1>
    </div>
  );
}