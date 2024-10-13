import type { Metadata } from 'next';
import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider';

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
    <ReactQueryClientProvider>
      {children}
    </ReactQueryClientProvider>
  );
}
