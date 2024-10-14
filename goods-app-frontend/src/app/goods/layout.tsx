import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider';

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
