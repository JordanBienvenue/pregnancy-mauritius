import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBadge } from "@/components/admin/status-badge";

describe("StatusBadge", () => {
  it("renders the status text", () => {
    render(<StatusBadge status="active" />);
    expect(screen.getByText("active")).toBeInTheDocument();
  });

  it("capitalizes status text", () => {
    const { container } = render(<StatusBadge status="pending" />);
    expect(container.firstChild).toHaveClass("capitalize");
  });

  it("renders unknown statuses without crashing", () => {
    render(<StatusBadge status="custom_status" />);
    expect(screen.getByText("custom_status")).toBeInTheDocument();
  });

  const statuses = [
    "active", "inactive", "pending", "confirmed", "completed",
    "cancelled", "flagged", "resolved", "dismissed", "published",
    "draft", "verified", "unverified",
  ];

  statuses.forEach((status) => {
    it(`renders ${status} status`, () => {
      render(<StatusBadge status={status} />);
      expect(screen.getByText(status)).toBeInTheDocument();
    });
  });
});
