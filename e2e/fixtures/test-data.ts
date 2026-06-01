export const LOCALES = ['en', 'fr', 'cr'] as const;
export const DEFAULT_LOCALE = 'cr';

export const PUBLIC_ROUTES = [
  '/blog',
  '/directory',
  '/donate',
  '/emergency',
  '/food-guide',
  '/rights',
] as const;

export const PROTECTED_ROUTES = [
  '/tracker',
  '/forum',
  '/marketplace',
  '/profile',
  '/postpartum',
] as const;

export const ADMIN_ROUTES = [
  '/admin',
  '/admin/providers',
  '/admin/blog',
  '/admin/sponsors',
  '/admin/marketplace',
  '/admin/donations',
  '/admin/forum',
  '/admin/users',
] as const;
