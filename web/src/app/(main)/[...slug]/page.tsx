import { PageRenderer } from '../../../components/PageRenderer';

async function getPageData(slug: string, revisionId?: string) {
  try {
    let url = `http://localhost:5000/api/v1/pages/by-slug?slug=${slug}`;
    if (revisionId) {
      url += `&revisionId=${revisionId}`;
    }
    const res = await fetch(url, {
      next: { revalidate: revisionId ? 0 : 60 }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch page data:', error);
    return null;
  }
}

export default async function Page({ params, searchParams }: { params: { slug: string[] }, searchParams: { [key: string]: string | string[] | undefined } }) {
  const { slug } = await params;
  const search = await searchParams;
  const path = slug.join('/');
  
  const pageData = await getPageData(path, search.revisionId as string);

  return <PageRenderer slug={path} layoutType={pageData?.layoutType} pageData={pageData} />;
}
