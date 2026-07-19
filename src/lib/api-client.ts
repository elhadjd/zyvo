export const baseApiURL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.zyvoerp.com';

export async function submitContact(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  country?: string;
  source?: string;
  page?: string;
}) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function submitSignup(data: Record<string, unknown>) {
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}
