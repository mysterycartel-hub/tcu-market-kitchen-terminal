import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.formData();
  // Placeholder: accept upload but do not store to broker
  const file = data.get('file');
  return NextResponse.json({ ok: true, message: 'Upload received (placeholder)', file: !!file });
}
