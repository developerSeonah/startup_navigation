import instanceGroupware from "@/api/axiosInstances/groupwareInstance";
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const body = await req.json();
  const cookieStore = await cookies();
  const xtoken = cookieStore.get('xtoken')?.value;
  const gwToken = cookieStore.get('gwtoken')?.value;  

  try {
    const res = await instanceGroupware.post('', body, {
      headers: {
        'x-token': xtoken,
        'gwtoken': gwToken,
        'Content-Type	': 'application/x-www-form-urlencoded',
      },
    });
    
    const data = res.data;
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error('Failed to fetch member info data:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
