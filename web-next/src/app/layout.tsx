import type { Metadata } from 'next';
import './globals.css';
import AccessibilityToolbar from '@/components/AccessibilityToolbar';
import Header from '@/components/Header';
import MegaMenu from '@/components/MegaMenu';
import NewsTicker from '@/components/NewsTicker';
import Footer from '@/components/Footer';
import LiveWallpaperBg from '@/components/LiveWallpaperBg';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { fetchMenu, fetchSettings, fetchTranslations } from '@/lib/api';
import { AccessibilityProvider } from '@/hooks/useAccessibility';

export const metadata: Metadata = {
  title: 'MahaPrisons - Maharashtra Prisons Department',
  description: 'Official Web Portal of Maharashtra Prisons Department',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuData = await fetchMenu();
  const settings = await fetchSettings();
  const translations = await fetchTranslations();

  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col relative">
        <AccessibilityProvider initialTranslations={translations}>
          <LiveWallpaperBg />
          <AccessibilityToolbar />
          <Header />
          
          <div className="sticky top-0 z-50">
            <MegaMenu menuData={menuData} />
            <NewsTicker />
          </div>
          
          <main className="flex-grow flex flex-col relative z-10 pt-[20px] pb-12">
            {children}
          </main>
          
          <Footer settings={settings} />
          <ScrollToTopButton />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
