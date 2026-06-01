import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RequireRole } from "@/components/admin/require-role";
import { AdminProvider } from "@/components/admin/admin-context";

function renderWithAdmin(role: string, children: React.ReactNode) {
  return render(
    <AdminProvider
      value={{
        userId: "test-id",
        fullName: "Test User",
        email: "test@test.com",
        role: role as "admin" | "moderator" | "editor" | "user",
      }}
    >
      {children}
    </AdminProvider>
  );
}

describe("RequireRole", () => {
  it("shows children when user has sufficient role", () => {
    renderWithAdmin("admin", (
      <RequireRole minimum="admin">
        <p>Admin content</p>
      </RequireRole>
    ));
    expect(screen.getByText("Admin content")).toBeInTheDocument();
  });

  it("shows children when user has higher role", () => {
    renderWithAdmin("admin", (
      <RequireRole minimum="editor">
        <p>Editor content</p>
      </RequireRole>
    ));
    expect(screen.getByText("Editor content")).toBeInTheDocument();
  });

  it("shows access denied when role is insufficient", () => {
    renderWithAdmin("editor", (
      <RequireRole minimum="admin">
        <p>Admin content</p>
      </RequireRole>
    ));
    expect(screen.queryByText("Admin content")).not.toBeInTheDocument();
    expect(screen.getByText("Access Denied")).toBeInTheDocument();
  });

  it("moderator can access moderator-level pages", () => {
    renderWithAdmin("moderator", (
      <RequireRole minimum="moderator">
        <p>Moderator content</p>
      </RequireRole>
    ));
    expect(screen.getByText("Moderator content")).toBeInTheDocument();
  });

  it("editor cannot access moderator-level pages", () => {
    renderWithAdmin("editor", (
      <RequireRole minimum="moderator">
        <p>Moderator content</p>
      </RequireRole>
    ));
    expect(screen.queryByText("Moderator content")).not.toBeInTheDocument();
    expect(screen.getByText("Access Denied")).toBeInTheDocument();
  });
});
