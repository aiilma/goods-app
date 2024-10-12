import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';

export default function CreateGoodLayout({
                                      children,
                                    }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}