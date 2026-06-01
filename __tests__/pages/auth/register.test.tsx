import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RegisterPage from "@/app/[locale]/(auth)/register/page";

// Mock supabase client
const mockSignUp = vi.fn().mockResolvedValue({ data: { user: { id: "test" } }, error: null });
vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signUp: mockSignUp,
    },
  }),
}));

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, replace: vi.fn(), back: vi.fn(), prefetch: vi.fn(), refresh: vi.fn() }),
  usePathname: () => "/en/register",
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

// Helper to get inputs by their id, since password fields share the same placeholder
function getPasswordInput() {
  return document.getElementById("reg-password") as HTMLInputElement;
}

function getConfirmPasswordInput() {
  return document.getElementById("confirm-password") as HTMLInputElement;
}

function getForm() {
  return document.getElementById("reg-password")!.closest("form")!;
}

describe("RegisterPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSignUp.mockResolvedValue({ data: { user: { id: "test" } }, error: null });
  });

  it("renders all form fields (name, email, phone, password, confirm)", () => {
    render(<RegisterPage />);
    expect(screen.getByPlaceholderText("Priya Ramgoolam")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("mama@email.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("+230 5XXX XXXX")).toBeInTheDocument();
    // Password and confirm password both exist
    expect(getPasswordInput()).toBeInTheDocument();
    expect(getConfirmPasswordInput()).toBeInTheDocument();
  });

  it("renders the register title and subtitle", () => {
    render(<RegisterPage />);
    expect(screen.getByText("registerTitle")).toBeInTheDocument();
    expect(screen.getByText("registerSubtitle")).toBeInTheDocument();
  });

  it("renders submit button with register text", () => {
    render(<RegisterPage />);
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  it("renders login link for existing users", () => {
    render(<RegisterPage />);
    expect(screen.getByText("hasAccount")).toBeInTheDocument();
    expect(screen.getByText("login")).toBeInTheDocument();
  });

  it("shows inline mismatch text when passwords differ while typing", () => {
    render(<RegisterPage />);

    fireEvent.change(getPasswordInput(), { target: { value: "password123" } });
    fireEvent.change(getConfirmPasswordInput(), { target: { value: "different" } });

    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  it("shows error from translation when submitting with mismatched passwords", async () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText("Priya Ramgoolam"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText("mama@email.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getPasswordInput(), {
      target: { value: "password123" },
    });
    fireEvent.change(getConfirmPasswordInput(), {
      target: { value: "differentpassword" },
    });

    fireEvent.submit(getForm());

    // Should show the translated error (t("passwordsDoNotMatch") returns "passwordsDoNotMatch")
    await vi.waitFor(() => {
      expect(screen.getByText("passwordsDoNotMatch")).toBeInTheDocument();
    });

    // signUp should NOT be called
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it("toggles between pregnancy (due date) and postpartum (baby DOB) sections", () => {
    render(<RegisterPage />);

    // Initially shows due date field (pregnancy mode)
    expect(screen.getByText("dueDate")).toBeInTheDocument();

    // Find the postpartum toggle switch
    const toggle = screen.getByRole("switch");
    expect(toggle).toBeInTheDocument();

    // Click to switch to postpartum mode
    fireEvent.click(toggle);

    // Now should show baby DOB field
    expect(screen.getByText("babyDob")).toBeInTheDocument();
  });

  it("renders the solo mother checkbox", () => {
    render(<RegisterPage />);
    expect(screen.getByText("isSoloMother")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("calls supabase.auth.signUp on valid form submit", async () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText("Priya Ramgoolam"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText("mama@email.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("+230 5XXX XXXX"), {
      target: { value: "+230 5123 4567" },
    });
    fireEvent.change(getPasswordInput(), {
      target: { value: "password123" },
    });
    fireEvent.change(getConfirmPasswordInput(), {
      target: { value: "password123" },
    });

    fireEvent.submit(getForm());

    await vi.waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        options: {
          data: {
            full_name: "Test User",
            phone: "+230 5123 4567",
            due_date: "",
            is_postpartum: false,
            baby_dob: "",
            is_solo_mother: false,
            locale: "en",
          },
        },
      });
    });
  });

  it("redirects to tracker on successful registration", async () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText("Priya Ramgoolam"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText("mama@email.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getPasswordInput(), {
      target: { value: "password123" },
    });
    fireEvent.change(getConfirmPasswordInput(), {
      target: { value: "password123" },
    });

    fireEvent.submit(getForm());

    await vi.waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/en/tracker");
    });
  });

  it("shows server error message on signUp failure", async () => {
    mockSignUp.mockResolvedValueOnce({
      error: { message: "Email already registered" },
    });

    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText("Priya Ramgoolam"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText("mama@email.com"), {
      target: { value: "existing@example.com" },
    });
    fireEvent.change(getPasswordInput(), {
      target: { value: "password123" },
    });
    fireEvent.change(getConfirmPasswordInput(), {
      target: { value: "password123" },
    });

    fireEvent.submit(getForm());

    expect(await screen.findByText("Email already registered")).toBeInTheDocument();
  });

  it("renders step indicators", () => {
    render(<RegisterPage />);
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Personal")).toBeInTheDocument();
    expect(screen.getByText("Pregnancy")).toBeInTheDocument();
  });
});
