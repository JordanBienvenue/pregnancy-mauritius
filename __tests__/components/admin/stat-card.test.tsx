import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatCard } from "@/components/admin/stat-card";
import { Users } from "lucide-react";

describe("StatCard", () => {
  it("renders label and value", () => {
    render(<StatCard label="Total Users" value={42} icon={Users} />);
    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders string value", () => {
    render(<StatCard label="Score" value="4.8" icon={Users} />);
    expect(screen.getByText("4.8")).toBeInTheDocument();
  });

  it("renders trend when provided", () => {
    render(
      <StatCard
        label="Users"
        value={100}
        icon={Users}
        trend={{ value: "12%", positive: true }}
      />
    );
    expect(screen.getByText("+12%")).toBeInTheDocument();
  });

  it("renders negative trend without plus", () => {
    render(
      <StatCard
        label="Users"
        value={100}
        icon={Users}
        trend={{ value: "-5%", positive: false }}
      />
    );
    expect(screen.getByText("-5%")).toBeInTheDocument();
  });
});
