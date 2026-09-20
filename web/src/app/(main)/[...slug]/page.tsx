import { PageRenderer } from '../../../components/PageRenderer';

async function getPageData(slug: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/v1/pages/by-slug?slug=${slug}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch page data:', error);
    return null;
  }
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = await params;
  const path = slug.join('/');
  
  const pageData = await getPageData(path);

  return <PageRenderer slug={path} layoutType={pageData?.layoutType} pageData={pageData} />;
}
