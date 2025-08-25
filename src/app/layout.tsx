"use client";
import { ReactNode } from 'react';
import '@/app/globals.css';
import { interTight } from '@/utils/fonts';
import { manrope } from '@/utils/fonts';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} ${manrope.variable} antialiased bg-gradient-to-br from-[#EAF6FF] to-[#FFFFFF]`}>{children}</body>
    </html>
  );
}
