function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#\d+;/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export interface ExtractedContent {
  title: string;
  content: string;
  wordCount: number;
  extractedAt: string;
}

export async function extractContentFromUrl(url: string): Promise<ExtractedContent> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(15_000),
    headers: {
      'User-Agent': 'ZYVO-ResearchEngine/1.0 (Content Extraction)',
      Accept: 'text/html,application/xhtml+xml',
    },
  });

  if (!response.ok) {
    throw new Error(`Falha ao aceder URL (${response.status}): ${url}`);
  }

  const html = await response.text();
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? stripHtml(titleMatch[1]) : url;

  const content = stripHtml(html).slice(0, 8000);

  return {
    title,
    content,
    wordCount: content.split(/\s+/).length,
    extractedAt: new Date().toISOString(),
  };
}

export function extractKeyFacts(content: string): string[] {
  const sentences = content
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 30 && s.length < 300);

  const factPatterns = [
    /\d+\s*%/,
    /\d{4}/,
    /loi|lei|law|décret|décret/i,
    /TVA|IVA|impôt|taxe|fiscal/i,
    /OHADA|SYSCOHADA|DGI|CNSS/i,
    /GNF|franc guinéen|CFA/i,
  ];

  return sentences
    .filter((s) => factPatterns.some((p) => p.test(s)))
    .slice(0, 10);
}
