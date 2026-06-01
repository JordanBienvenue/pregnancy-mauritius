import { describe, it, expect } from "vitest";
import {
  hasMinimumRole,
  isStaffRole,
  ROLE_HIERARCHY,
  STAFF_ROLES,
  type Role,
} from "@/lib/admin/role-check";

describe("ROLE_HIERARCHY", () => {
  it("defines correct hierarchy levels", () => {
    expect(ROLE_HIERARCHY.user).toBe(0);
    expect(ROLE_HIERARCHY.editor).toBe(1);
    expect(ROLE_HIERARCHY.moderator).toBe(2);
    expect(ROLE_HIERARCHY.admin).toBe(3);
  });

  it("admin has highest level", () => {
    const maxRole = Object.entries(ROLE_HIERARCHY).reduce((a, b) =>
      a[1] > b[1] ? a : b
    );
    expect(maxRole[0]).toBe("admin");
  });
});

describe("hasMinimumRole", () => {
  it("admin has all roles", () => {
    expect(hasMinimumRole("admin", "admin")).toBe(true);
    expect(hasMinimumRole("admin", "moderator")).toBe(true);
    expect(hasMinimumRole("admin", "editor")).toBe(true);
    expect(hasMinimumRole("admin", "user")).toBe(true);
  });

  it("moderator has moderator, editor, user but not admin", () => {
    expect(hasMinimumRole("moderator", "admin")).toBe(false);
    expect(hasMinimumRole("moderator", "moderator")).toBe(true);
    expect(hasMinimumRole("moderator", "editor")).toBe(true);
    expect(hasMinimumRole("moderator", "user")).toBe(true);
  });

  it("editor has editor and user but not moderator or admin", () => {
    expect(hasMinimumRole("editor", "admin")).toBe(false);
    expect(hasMinimumRole("editor", "moderator")).toBe(false);
    expect(hasMinimumRole("editor", "editor")).toBe(true);
    expect(hasMinimumRole("editor", "user")).toBe(true);
  });

  it("user only has user", () => {
    expect(hasMinimumRole("user", "admin")).toBe(false);
    expect(hasMinimumRole("user", "moderator")).toBe(false);
    expect(hasMinimumRole("user", "editor")).toBe(false);
    expect(hasMinimumRole("user", "user")).toBe(true);
  });
});

describe("isStaffRole", () => {
  it("returns true for staff roles", () => {
    expect(isStaffRole("admin")).toBe(true);
    expect(isStaffRole("moderator")).toBe(true);
    expect(isStaffRole("editor")).toBe(true);
  });

  it("returns false for user role", () => {
    expect(isStaffRole("user")).toBe(false);
  });
});

describe("STAFF_ROLES", () => {
  it("includes editor, moderator, admin", () => {
    expect(STAFF_ROLES).toContain("editor");
    expect(STAFF_ROLES).toContain("moderator");
    expect(STAFF_ROLES).toContain("admin");
  });

  it("does not include user", () => {
    expect(STAFF_ROLES).not.toContain("user");
  });
});
