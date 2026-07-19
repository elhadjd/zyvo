import { redirect } from 'next/navigation';

export default function AiContentLoginRedirect() {
  redirect('/admin/ai-engine/login');
}
