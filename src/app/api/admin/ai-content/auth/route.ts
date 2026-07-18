import { NextResponse } from 'next/server';
import {
  createAdminToken,
  verifyAdminPassword,
  setAdminCookie,
  clearAdminCookie,
} from '@/lib/ai/auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password || !(await verifyAdminPassword(password))) {
      return NextResponse.json({ error: 'Senha inválida' }, { status: 401 });
    }

    const token = await createAdminToken();
    await setAdminCookie(token);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erro de autenticação' }, { status: 500 });
  }
}

export async function DELETE() {
  await clearAdminCookie();
  return NextResponse.json({ success: true });
}
