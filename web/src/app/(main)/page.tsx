import HomePage from '../../views/HomePage';
import { API_URL } from '../../utils/apiConfig';

async function getPageData() {
  try {
    const res = await fetch(`${API_URL}/api/v1/pages/by-slug?slug=/`, {
      next: { revalidate: 60 } // optional revalidation
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);
    return null;
  }
}

export default async function Page() {
  const pageData = await getPageData();
  
  return <HomePage pageData={pageData} />;
}
