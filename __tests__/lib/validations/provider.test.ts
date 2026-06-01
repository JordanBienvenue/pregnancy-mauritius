import { describe, it, expect } from "vitest";
import { providerCreateSchema, providerUpdateSchema } from "@/lib/validations/provider";

describe("providerCreateSchema", () => {
  const validProvider = {
    name: "Dr. Anisha",
    type: "gynaecologist" as const,
    district: "Curepipe",
  };

  it("accepts valid minimal provider", () => {
    const result = providerCreateSchema.safeParse(validProvider);
    expect(result.success).toBe(true);
  });

  it("accepts full provider data", () => {
    const result = providerCreateSchema.safeParse({
      ...validProvider,
      address: "Royal Road, Curepipe",
      phone: "+230 674 1234",
      email: "dr@example.com",
      website: "https://example.com",
      lat: -20.3167,
      lng: 57.5167,
      description: "Specialist in high-risk pregnancies",
      is_verified: true,
      is_public: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = providerCreateSchema.safeParse({ ...validProvider, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid type", () => {
    const result = providerCreateSchema.safeParse({ ...validProvider, type: "dentist" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = providerCreateSchema.safeParse({ ...validProvider, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("allows empty string email", () => {
    const result = providerCreateSchema.safeParse({ ...validProvider, email: "" });
    expect(result.success).toBe(true);
  });
});

describe("providerUpdateSchema", () => {
  it("accepts partial updates", () => {
    const result = providerUpdateSchema.safeParse({ name: "Updated Name" });
    expect(result.success).toBe(true);
  });

  it("accepts empty object", () => {
    const result = providerUpdateSchema.safeParse({});
    expect(result.success).toBe(true);
  });
});
