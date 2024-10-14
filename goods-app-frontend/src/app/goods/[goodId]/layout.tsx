import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';

export default function GoodLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout style={{ padding: '20px' }}>
      <Content style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {children}
      </Content>
    </Layout>
  );
}
