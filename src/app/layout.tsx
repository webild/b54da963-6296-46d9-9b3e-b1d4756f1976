"use client";
import { ReactNode } from 'react';
import '@/app/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-br from-[#EAF6FF] to-[#FFFFFF]">{children}</body>
    </html>
  );
}
