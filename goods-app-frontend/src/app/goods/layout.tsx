import type { Metadata } from 'next';

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
        {children}
      </body>
    </html>
  );
}
