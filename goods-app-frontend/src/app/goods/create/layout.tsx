'use client';

import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider';

export default function CreateGoodLayout({
                                      children,
                                    }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryClientProvider>
          {children}
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}