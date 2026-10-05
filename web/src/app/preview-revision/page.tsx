import { redirect } from 'next/navigation';
import Layout from '../../components/Layout';
import HomePage from '../../views/HomePage';
import { AccessibilityProvider } from '../../hooks/useAccessibility';

async function getGlobalDataWithRevision(revisionId: string) {
  try {
    const [menuRes, settingsRes, revisionRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/menu`, { next: { revalidate: 60 } }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/settings`, { next: { revalidate: 60 } }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/review/public/${revisionId}`, { cache: 'no-store' })
    ]);

    let menuData = await menuRes.json();
    let settingsData = await settingsRes.json();
    const revision = await revisionRes.json();

    if (revision && !revision.error) {
      if (revision.modelName === 'Menu') {
        menuData = revision.proposedData;
      } else if (revision.modelName === 'SiteSetting') {
        settingsData[revision.recordId] = revision.proposedData;
      }
    }

    return { menuData, settingsData };
  } catch (error) {
    console.error('Failed to fetch preview global data:', error);
    return { menuData: [], settingsData: {} };
  }
}

export default async function PreviewRevisionPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const search = await searchParams;
  const revisionId = search.revisionId as string;
  
  if (!revisionId) {
    redirect('/');
  }

  const { menuData, settingsData } = await getGlobalDataWithRevision(revisionId);

  // Fetch home page data for HomePage
  let pageData = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/pages/by-slug?slug=/`, { cache: 'no-store' });
    if (res.ok) pageData = await res.json();
  } catch (e) {
    console.error(e);
  }

  return (
    <AccessibilityProvider>
      <Layout menuData={menuData} settingsData={settingsData}>
        <HomePage pageData={pageData} />
      </Layout>
    </AccessibilityProvider>
  );
}
