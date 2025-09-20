import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '../context/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EVILSTASH - Under a Cloak of Secrecy',
  description: 'Secure anonymous messaging platform hidden in the shadows.',
  keywords: 'anonymous, messaging, secure, private, encrypted',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
      </head>
      <AuthProvider>
        <body className={`${inter.className} bg-black text-white min-h-screen`}>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
