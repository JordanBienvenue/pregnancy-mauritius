import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Header } from "@/components/shared/header";

// Mock supabase client - track getUser and onAuthStateChange
const mockGetUser = vi.fn();
const mockSignOut = vi.fn();
const mockUnsubscribe = vi.fn();
const mockOnAuthStateChange = vi.fn();
const mockFrom = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      getUser: mockGetUser,
      signOut: mockSignOut,
      onAuthStateChange: mockOnAuthStateChange,
    },
    from: mockFrom,
  }),
}));

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, replace: vi.fn(), back: vi.fn(), prefetch: vi.fn(), refresh: vi.fn() }),
  usePathname: () => "/en",
}));

vi.mock("next-intl", () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    t.rich = (key: string) => key;
    t.raw = (key: string) => key;
    return t;
  },
  useLocale: () => "en",
}));

vi.mock("framer-motion", () => {
  const React = require("react");
  const handler = {
    get(_: any, prop: string) {
      return React.forwardRef(({ children, ...props }: any, ref: any) => {
        const { initial, animate, exit, transition, whileHover, whileTap, variants, layout, ...rest } = props;
        const filtered: Record<string, any> = {};
        for (const [k, v] of Object.entries(rest)) {
          if (typeof v !== "object" || k.startsWith("on") || k === "className" || k === "style" || k === "id" || k === "role" || k === "type") {
            filtered[k] = v;
          }
        }
        return React.createElement(prop, { ...filtered, ref }, children);
      });
    },
  };
  return {
    motion: new Proxy({}, handler),
    AnimatePresence: ({ children }: any) => children,
  };
});

// Mock the LanguageSwitcher since it uses Select which needs complex DOM
vi.mock("@/components/shared/language-switcher", () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher">LanguageSwitcher</div>,
}));

// Mock NotificationBell (its realtime/data behaviour is covered by e2e)
vi.mock("@/components/shared/notification-bell", () => ({
  NotificationBell: () => <div data-testid="notification-bell" />,
}));

// Mock the Sheet components from base-ui (complex portals)
vi.mock("@/components/ui/sheet", () => {
  const React = require("react");
  return {
    Sheet: ({ children }: any) => <div data-testid="sheet">{children}</div>,
    SheetContent: ({ children }: any) => <div data-testid="sheet-content">{children}</div>,
    SheetTrigger: ({ children, render, ...props }: any) => (
      <button data-testid="sheet-trigger" {...props}>{children}</button>
    ),
    SheetTitle: ({ children }: any) => <div>{children}</div>,
  };
});

function setupNoUser() {
  mockGetUser.mockResolvedValue({ data: { user: null }, error: null });
  mockOnAuthStateChange.mockReturnValue({
    data: { subscription: { unsubscribe: mockUnsubscribe } },
  });
}

function setupLoggedInUser(name = "Test User", email = "test@example.com") {
  mockGetUser.mockResolvedValue({
    data: {
      user: {
        id: "user-123",
        email,
        user_metadata: { full_name: name },
      },
    },
    error: null,
  });
  mockOnAuthStateChange.mockReturnValue({
    data: { subscription: { unsubscribe: mockUnsubscribe } },
  });
  // Mock the profiles query for admin check
  mockFrom.mockReturnValue({
    select: vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({ data: { role: "user" }, error: null }),
      }),
    }),
  });
}

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders logo with Manman Moris text", async () => {
    setupNoUser();
    render(<Header />);
    expect(screen.getByText("Manman")).toBeInTheDocument();
    expect(screen.getByText("Moris")).toBeInTheDocument();
  });

  it("renders navigation links", async () => {
    setupNoUser();
    render(<Header />);
    // Primary nav links appear in both desktop and mobile
    expect(screen.getAllByText("tracker").length).toBeGreaterThan(0);
    expect(screen.getAllByText("directory").length).toBeGreaterThan(0);
    expect(screen.getAllByText("forum").length).toBeGreaterThan(0);
  });

  it("renders language switcher", async () => {
    setupNoUser();
    render(<Header />);
    expect(screen.getByTestId("language-switcher")).toBeInTheDocument();
  });

  it("shows login and register buttons when no user is logged in", async () => {
    setupNoUser();
    render(<Header />);

    await waitFor(() => {
      expect(mockGetUser).toHaveBeenCalled();
    });

    // Login/register appear in both desktop and mobile
    expect(screen.getAllByText("login").length).toBeGreaterThan(0);
    expect(screen.getAllByText("register").length).toBeGreaterThan(0);
  });

  it("shows user name and logout when user is logged in", async () => {
    setupLoggedInUser("Priya Ramgoolam", "priya@example.com");
    render(<Header />);

    await waitFor(() => {
      expect(screen.getAllByText("Priya Ramgoolam").length).toBeGreaterThan(0);
    });

    // logout button should be visible (appears in desktop + mobile)
    expect(screen.getAllByText("logout").length).toBeGreaterThan(0);
  });

  it("shows email prefix as display name when full_name is not set", async () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: "user-123",
          email: "mama@example.com",
          user_metadata: {},
        },
      },
      error: null,
    });
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: mockUnsubscribe } },
    });
    mockFrom.mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: { role: "user" }, error: null }),
        }),
      }),
    });

    render(<Header />);

    await waitFor(() => {
      expect(screen.getAllByText("mama").length).toBeGreaterThan(0);
    });
  });

  it("cleans up auth subscription on unmount", async () => {
    setupNoUser();
    const { unmount } = render(<Header />);

    await waitFor(() => {
      expect(mockOnAuthStateChange).toHaveBeenCalled();
    });

    unmount();
    expect(mockUnsubscribe).toHaveBeenCalled();
  });

  it("renders dropdown labels for resources and services", async () => {
    setupNoUser();
    render(<Header />);
    // NavDropdown labels come from t("resources") and t("services")
    expect(screen.getAllByText("resources").length).toBeGreaterThan(0);
    expect(screen.getAllByText("services").length).toBeGreaterThan(0);
  });
});
