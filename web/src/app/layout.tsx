import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Layout from "../components/Layout";
import { AccessibilityProvider } from "../hooks/useAccessibility";
import ScrollToTop from "../components/ScrollToTop";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "MahaPrisons | महाराष्ट्र कारागृह विभाग",
  description: "Official website of Maharashtra Prisons and Correctional Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} smooth-transition antialiased`}>
        <AccessibilityProvider>
          <ScrollToTop />
          <Layout>
            {children}
          </Layout>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
