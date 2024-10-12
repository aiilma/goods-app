import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Goods Catalog",
  description: "Goods Catalog Description",
};

export default function GoodsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
