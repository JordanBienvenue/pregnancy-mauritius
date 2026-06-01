import { vi } from 'vitest';

export function createMockQueryBuilder(data: any = [], error: any = null) {
  const builder: any = {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    neq: vi.fn().mockReturnThis(),
    gt: vi.fn().mockReturnThis(),
    lt: vi.fn().mockReturnThis(),
    gte: vi.fn().mockReturnThis(),
    lte: vi.fn().mockReturnThis(),
    like: vi.fn().mockReturnThis(),
    ilike: vi.fn().mockReturnThis(),
    is: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    range: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: data[0] ?? null, error }),
    maybeSingle: vi.fn().mockResolvedValue({ data: data[0] ?? null, error }),
    then: vi.fn((resolve: any) => resolve({ data, error })),
  };
  // Make it thenable
  builder[Symbol.for('nodejs.util.promisify.custom')] = undefined;
  return builder;
}

export const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  user_metadata: { full_name: 'Test User' },
  app_metadata: {},
  aud: 'authenticated',
  created_at: '2026-01-01T00:00:00Z',
};

export const mockProfile = {
  id: 'test-user-id',
  full_name: 'Test User',
  phone: '+230 5748 0000',
  locale: 'en',
  due_date: '2026-07-15',
  is_postpartum: false,
  baby_dob: null,
  is_solo_mother: false,
  role: 'user',
  created_at: '2026-01-01T00:00:00Z',
};

export function createMockSupabaseClient(overrides: {
  user?: any;
  signInError?: any;
  signUpError?: any;
  queryData?: any[];
  queryError?: any;
} = {}) {
  const user = overrides.user ?? null;

  return {
    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({
        data: overrides.signInError ? null : { user: user ?? mockUser },
        error: overrides.signInError ?? null,
      }),
      signUp: vi.fn().mockResolvedValue({
        data: overrides.signUpError ? null : { user: user ?? mockUser },
        error: overrides.signUpError ?? null,
      }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
      getUser: vi.fn().mockResolvedValue({
        data: { user: user ?? null },
        error: null,
      }),
      resetPasswordForEmail: vi.fn().mockResolvedValue({ data: {}, error: null }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      }),
    },
    from: vi.fn(() => createMockQueryBuilder(
      overrides.queryData ?? [],
      overrides.queryError ?? null,
    )),
  };
}
