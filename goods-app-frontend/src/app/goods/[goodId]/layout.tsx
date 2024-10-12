import type { Metadata } from 'next';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider';

export const metadata: Metadata = {
  title: 'Good',
  description: 'Good Description',
};

export default function GoodLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryClientProvider>
          <Layout style={{ padding: '20px' }}>
            <Content style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {children}
            </Content>
          </Layout>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
