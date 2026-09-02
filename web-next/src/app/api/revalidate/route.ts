import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  
  if (authHeader !== `Bearer ${process.env.REVALIDATE_SECRET}`) {
    return NextResponse.json({ message: 'Invalid revalidation token' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { path, tag } = body;

    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ revalidated: true, type: 'tag', target: tag, now: Date.now() });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, type: 'path', target: path, now: Date.now() });
    }

    return NextResponse.json({ message: 'Missing path or tag payload' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ message: 'Error processing revalidation request' }, { status: 500 });
  }
}
