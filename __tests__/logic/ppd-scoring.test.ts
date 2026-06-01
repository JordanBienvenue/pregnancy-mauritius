import { describe, it, expect } from "vitest";
import {
  getOptionScore,
  getScoreCategory,
  calculateTotalScore,
  type EPDSQuestion,
} from "@/lib/calculators/ppd-scoring";

describe("getOptionScore", () => {
  it("returns optionIndex for normal questions", () => {
    expect(getOptionScore(0, false)).toBe(0);
    expect(getOptionScore(1, false)).toBe(1);
    expect(getOptionScore(2, false)).toBe(2);
    expect(getOptionScore(3, false)).toBe(3);
  });

  it("returns reversed score for reverse-scored questions", () => {
    expect(getOptionScore(0, true)).toBe(3);
    expect(getOptionScore(1, true)).toBe(2);
    expect(getOptionScore(2, true)).toBe(1);
    expect(getOptionScore(3, true)).toBe(0);
  });
});

describe("getScoreCategory", () => {
  it("returns normal for scores 0-8", () => {
    expect(getScoreCategory(0)).toBe("normal");
    expect(getScoreCategory(8)).toBe("normal");
  });

  it("returns monitor for scores 9-12", () => {
    expect(getScoreCategory(9)).toBe("monitor");
    expect(getScoreCategory(12)).toBe("monitor");
  });

  it("returns atRisk for scores 13-19", () => {
    expect(getScoreCategory(13)).toBe("atRisk");
    expect(getScoreCategory(19)).toBe("atRisk");
  });

  it("returns crisis for scores 20-30", () => {
    expect(getScoreCategory(20)).toBe("crisis");
    expect(getScoreCategory(30)).toBe("crisis");
  });

  // Boundary tests
  it("boundary: 8 is normal, 9 is monitor", () => {
    expect(getScoreCategory(8)).toBe("normal");
    expect(getScoreCategory(9)).toBe("monitor");
  });

  it("boundary: 12 is monitor, 13 is atRisk", () => {
    expect(getScoreCategory(12)).toBe("monitor");
    expect(getScoreCategory(13)).toBe("atRisk");
  });

  it("boundary: 19 is atRisk, 20 is crisis", () => {
    expect(getScoreCategory(19)).toBe("atRisk");
    expect(getScoreCategory(20)).toBe("crisis");
  });
});

describe("calculateTotalScore", () => {
  const mockQuestions: EPDSQuestion[] = [
    { id: 1, text: "Q1", options: ["a", "b", "c", "d"], reverseScored: false },
    { id: 2, text: "Q2", options: ["a", "b", "c", "d"], reverseScored: false },
    { id: 3, text: "Q3", options: ["a", "b", "c", "d"], reverseScored: true },
    { id: 4, text: "Q4", options: ["a", "b", "c", "d"], reverseScored: true },
  ];

  it("returns 0 for all null answers", () => {
    expect(calculateTotalScore([null, null, null, null], mockQuestions)).toBe(0);
  });

  it("returns 0 for all minimum-scoring answers", () => {
    // Normal Q1=0(score 0), Normal Q2=0(score 0), Reverse Q3=3(score 0), Reverse Q4=3(score 0)
    expect(calculateTotalScore([0, 0, 3, 3], mockQuestions)).toBe(0);
  });

  it("returns max score for all maximum-scoring answers", () => {
    // Normal Q1=3(score 3), Normal Q2=3(score 3), Reverse Q3=0(score 3), Reverse Q4=0(score 3)
    expect(calculateTotalScore([3, 3, 0, 0], mockQuestions)).toBe(12);
  });

  it("correctly sums mixed answers", () => {
    // Normal Q1=1(score 1), Normal Q2=2(score 2), Reverse Q3=1(score 2), Reverse Q4=2(score 1)
    expect(calculateTotalScore([1, 2, 1, 2], mockQuestions)).toBe(6);
  });

  it("skips null answers in calculation", () => {
    expect(calculateTotalScore([3, null, null, null], mockQuestions)).toBe(3);
  });
});
