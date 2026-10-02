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
  title: 'Scuderia Corse Manila — 2026 Motorsport & Performance Dealership',
  description: 'Track-certified homologation supercar dealer powered by OmniDrive 2026 SaaS.',
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
