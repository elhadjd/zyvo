const CATEGORY_STYLES: Record<string, { bg: string; text: string; gradient: string }> = {
  Guides: {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-300',
    gradient: 'from-blue-600 to-indigo-700',
  },
  Opérations: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    gradient: 'from-emerald-600 to-teal-700',
  },
  Fiscalité: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
    gradient: 'from-amber-500 to-orange-600',
  },
  Technologie: {
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    text: 'text-violet-700 dark:text-violet-300',
    gradient: 'from-violet-600 to-purple-700',
  },
  default: {
    bg: 'bg-brand-primary/10 dark:bg-brand-primary/20',
    text: 'text-brand-primary dark:text-brand-accent',
    gradient: 'from-brand-primary to-brand-primary-hover',
  },
};

export function getBlogCategoryStyle(category: string) {
  return CATEGORY_STYLES[category] ?? CATEGORY_STYLES.default;
}

export function formatBlogDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
