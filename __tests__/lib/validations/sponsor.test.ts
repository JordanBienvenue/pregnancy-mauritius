import { describe, it, expect } from "vitest";
import { sponsorCreateSchema } from "@/lib/validations/sponsor";

describe("sponsorCreateSchema", () => {
  const validSponsor = {
    name: "CityPharm",
    package: "premium" as const,
    category: "pharmacy",
  };

  it("accepts valid sponsor", () => {
    const result = sponsorCreateSchema.safeParse(validSponsor);
    expect(result.success).toBe(true);
  });

  it("accepts all package types", () => {
    for (const pkg of ["basic", "standard", "premium", "exclusive"] as const) {
      const result = sponsorCreateSchema.safeParse({ ...validSponsor, package: pkg });
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid package", () => {
    const result = sponsorCreateSchema.safeParse({ ...validSponsor, package: "vip" });
    expect(result.success).toBe(false);
  });

  it("rejects empty name", () => {
    const result = sponsorCreateSchema.safeParse({ ...validSponsor, name: "" });
    expect(result.success).toBe(false);
  });

  it("defaults is_active to true", () => {
    const result = sponsorCreateSchema.safeParse(validSponsor);
    if (result.success) {
      expect(result.data.is_active).toBe(true);
    }
  });
});
