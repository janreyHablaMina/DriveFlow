import type { Metadata } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-montserrat',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'DriveFlow Motors Manila — Premier Luxury & Performance Car Dealership',
  description: 'Metro Manila’s premier destination for authenticated luxury, sports, and executive automobiles with 200-point inspection and tailored financing.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${inter.variable} font-sans bg-[#0a0a0e] text-slate-100 antialiased selection:bg-[#e10600] selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
