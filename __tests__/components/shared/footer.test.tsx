import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/shared/footer";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn(), prefetch: vi.fn(), refresh: vi.fn() }),
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

describe("Footer", () => {
  it("renders the brand logo and name", () => {
    render(<Footer />);
    expect(screen.getByText("Manman")).toBeInTheDocument();
    expect(screen.getByText("Moris")).toBeInTheDocument();
  });

  it("renders the brand description", () => {
    render(<Footer />);
    expect(
      screen.getByText("The first all-in-one pregnancy platform for Mauritius.")
    ).toBeInTheDocument();
  });

  it("renders Platform section links", () => {
    render(<Footer />);
    expect(screen.getByText("Platform")).toBeInTheDocument();
    // t("tracker"), t("directory"), t("emergency"), t("postpartum") return the keys
    expect(screen.getByText("tracker")).toBeInTheDocument();
    expect(screen.getByText("directory")).toBeInTheDocument();
    expect(screen.getByText("emergency")).toBeInTheDocument();
    expect(screen.getByText("postpartum")).toBeInTheDocument();
  });

  it("renders Community section links", () => {
    render(<Footer />);
    expect(screen.getByText("Community")).toBeInTheDocument();
    expect(screen.getByText("forum")).toBeInTheDocument();
    expect(screen.getByText("donations")).toBeInTheDocument();
    expect(screen.getByText("marketplace")).toBeInTheDocument();
    expect(screen.getByText("blog")).toBeInTheDocument();
  });

  it("renders Resources section links", () => {
    render(<Footer />);
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("foodGuide")).toBeInTheDocument();
    expect(screen.getByText("rights")).toBeInTheDocument();
  });

  it("renders copyright text with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${year} Manman Moris`))).toBeInTheDocument();
  });

  it("renders Made in Mauritius text", () => {
    render(<Footer />);
    expect(screen.getByText(/in Mauritius/)).toBeInTheDocument();
  });

  it("renders links with correct locale prefix", () => {
    render(<Footer />);
    // Check that links point to /en prefixed paths
    const links = screen.getAllByRole("link");
    const hrefs = links.map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("/en/tracker");
    expect(hrefs).toContain("/en/directory");
    expect(hrefs).toContain("/en/emergency");
    expect(hrefs).toContain("/en/forum");
    expect(hrefs).toContain("/en/donate");
    expect(hrefs).toContain("/en/food-guide");
    expect(hrefs).toContain("/en/rights");
    expect(hrefs).toContain("/en/blog");
    expect(hrefs).toContain("/en/marketplace");
    expect(hrefs).toContain("/en/postpartum");
  });
});
