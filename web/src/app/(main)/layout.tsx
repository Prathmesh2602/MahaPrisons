import "../globals.css";
import Layout from "../../components/Layout";
import { AccessibilityProvider } from "../../hooks/useAccessibility";
import ScrollToTop from "../../components/ScrollToTop";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let menuData = [];
  let settingsData = null;

  try {
    const menuRes = await fetch('http://localhost:5000/api/v1/menu', { next: { revalidate: 60 } });
    if (menuRes.ok) menuData = await menuRes.json();

    const settingsRes = await fetch('http://localhost:5000/api/v1/settings', { next: { revalidate: 60 } });
    if (settingsRes.ok) settingsData = await settingsRes.json();
  } catch (err) {
    console.error('Failed to fetch global data', err);
  }

  return (
    <>
      <AccessibilityProvider>
        <ScrollToTop />
        <Layout menuData={menuData} settingsData={settingsData}>
          {children}
        </Layout>
      </AccessibilityProvider>
    </>
  );
}
