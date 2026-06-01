import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles undefined and null", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
  });

  it("handles false and empty strings", () => {
    expect(cn("foo", false, "", "bar")).toBe("foo bar");
  });

  it("resolves conflicting Tailwind classes (last wins)", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("resolves conflicting padding", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
  });

  it("keeps non-conflicting classes", () => {
    expect(cn("text-red-500", "bg-blue-500")).toBe("text-red-500 bg-blue-500");
  });

  it("handles conditional classes", () => {
    const isActive = true;
    expect(cn("base", isActive && "active")).toBe("base active");
  });

  it("returns empty string for no input", () => {
    expect(cn()).toBe("");
  });
});
