import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "@/app/[locale]/(auth)/login/page";

// Mock supabase client
const mockSignIn = vi.fn();
vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: mockSignIn,
    },
  }),
}));

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, replace: vi.fn(), back: vi.fn(), prefetch: vi.fn(), refresh: vi.fn() }),
  usePathname: () => "/en/login",
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

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders email and password inputs", () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText("mama@email.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<LoginPage />);
    // The button text comes from tc("login") which returns "login"
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("renders forgot password link", () => {
    render(<LoginPage />);
    expect(screen.getByText(/forgotPassword/i)).toBeInTheDocument();
  });

  it("renders register link", () => {
    render(<LoginPage />);
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });

  it("calls signInWithPassword on form submit", async () => {
    mockSignIn.mockResolvedValueOnce({ error: null });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("mama@email.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "password123" },
    });
    fireEvent.submit(screen.getByPlaceholderText("mama@email.com").closest("form")!);

    await vi.waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it("shows error message on sign-in failure", async () => {
    mockSignIn.mockResolvedValueOnce({
      error: { message: "Invalid credentials" },
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("mama@email.com"), {
      target: { value: "bad@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "wrong" },
    });
    fireEvent.submit(screen.getByPlaceholderText("mama@email.com").closest("form")!);

    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
  });

  it("redirects to tracker on successful login", async () => {
    mockSignIn.mockResolvedValueOnce({ error: null });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("mama@email.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "password123" },
    });
    fireEvent.submit(screen.getByPlaceholderText("mama@email.com").closest("form")!);

    await vi.waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/en/tracker");
    });
  });
});
