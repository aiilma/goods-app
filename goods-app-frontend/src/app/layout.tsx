import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import 'antd/dist/reset.css';

export const metadata: Metadata = {
  title: "Goods Catalog",
  description: "Goods Catalog Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}
