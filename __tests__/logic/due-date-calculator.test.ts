import { describe, it, expect } from "vitest";
import {
  calculateDueDate,
  calculateWeekFromDueDate,
  getTrimester,
  getProgress,
} from "@/lib/calculators/due-date";

describe("calculateDueDate", () => {
  it("adds 280 days to LMP date", () => {
    const lmp = new Date("2026-01-01");
    const due = calculateDueDate(lmp);
    expect(due.toISOString().slice(0, 10)).toBe("2026-10-08");
  });

  it("handles leap year", () => {
    const lmp = new Date("2024-02-01");
    const due = calculateDueDate(lmp);
    expect(due.toISOString().slice(0, 10)).toBe("2024-11-07");
  });
});

describe("calculateWeekFromDueDate", () => {
  it("returns week 40 when due date is today", () => {
    const today = new Date();
    const week = calculateWeekFromDueDate(today);
    expect(week).toBe(40);
  });

  it("returns week 1 for due date 280 days from now", () => {
    const future = new Date();
    future.setDate(future.getDate() + 273); // ~39 weeks from now = week 1
    const week = calculateWeekFromDueDate(future);
    expect(week).toBe(1);
  });

  it("clamps to minimum week 1", () => {
    const farFuture = new Date();
    farFuture.setDate(farFuture.getDate() + 365);
    const week = calculateWeekFromDueDate(farFuture);
    expect(week).toBe(1);
  });

  it("clamps to maximum week 40", () => {
    const past = new Date();
    past.setDate(past.getDate() - 365);
    const week = calculateWeekFromDueDate(past);
    expect(week).toBe(40);
  });
});

describe("getTrimester", () => {
  it("returns 1 for weeks 1-12", () => {
    expect(getTrimester(1)).toBe(1);
    expect(getTrimester(12)).toBe(1);
  });

  it("returns 2 for weeks 13-27", () => {
    expect(getTrimester(13)).toBe(2);
    expect(getTrimester(27)).toBe(2);
  });

  it("returns 3 for weeks 28-40", () => {
    expect(getTrimester(28)).toBe(3);
    expect(getTrimester(40)).toBe(3);
  });
});

describe("getProgress", () => {
  it("returns 0% at week 0", () => {
    expect(getProgress(0)).toBe(0);
  });

  it("returns 50% at week 20", () => {
    expect(getProgress(20)).toBe(50);
  });

  it("returns 100% at week 40", () => {
    expect(getProgress(40)).toBe(100);
  });

  it("returns 60% at week 24", () => {
    expect(getProgress(24)).toBe(60);
  });
});
