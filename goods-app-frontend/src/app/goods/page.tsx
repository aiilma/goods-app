import { NEST_SSR_API_ADDRESS } from '@/constants/api';

async function getData() {
  try {
    const response = await fetch(`${NEST_SSR_API_ADDRESS}/goods`, {
      method: 'POST',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function GoodsPage() {
  const data = await getData();

  return (
    <main>
      <h1>GOODS</h1>
      <div>
        {data?.goods.map((good: any) => (
          <div key={good.id}>
            <h1>{good.name}</h1>
          </div>
        ))}
      </div>
    </main>
  );
}
