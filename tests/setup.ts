import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/cr',
  useParams: () => ({}),
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
}));

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    t.rich = (key: string) => key;
    t.raw = (key: string) => key;
    t.markup = (key: string) => key;
    return t;
  },
  useLocale: () => 'en',
  useMessages: () => ({}),
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock framer-motion
vi.mock('framer-motion', () => {
  const actual = { __esModule: true };
  const motionHandler = {
    get(_: any, prop: string) {
      return ({ children, ...props }: any) => {
        const { initial, animate, exit, transition, whileHover, whileTap, variants, ...domProps } = props;
        const filteredProps: Record<string, any> = {};
        for (const [key, value] of Object.entries(domProps)) {
          if (typeof value !== 'function' || key.startsWith('on')) {
            filteredProps[key] = value;
          }
        }
        const React = require('react');
        return React.createElement(prop, filteredProps, children);
      };
    }
  };
  return {
    ...actual,
    motion: new Proxy({}, motionHandler),
    AnimatePresence: ({ children }: any) => children,
    useAnimation: () => ({ start: vi.fn(), stop: vi.fn() }),
    useInView: () => true,
    useScroll: () => ({ scrollY: { get: () => 0 } }),
  };
});
