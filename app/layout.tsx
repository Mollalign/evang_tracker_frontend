import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from './providers'
import { Toaster } from 'sonner'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Evangelism Tracker",
  description: "A modern, Spirit-led workspace to capture outreach stories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster position="top-right" richColors closeButton toastOptions={{ style: { borderRadius: 16, background: "rgba(8, 0, 27, 0.85)", color: "#F9FAFB", backdropFilter: "blur(8px)" } }} />
        </Providers>
      </body>
    </html>
  );
}
