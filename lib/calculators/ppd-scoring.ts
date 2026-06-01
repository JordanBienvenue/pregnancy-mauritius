/**
 * Edinburgh Postnatal Depression Scale (EPDS) scoring utilities.
 */

export interface EPDSQuestion {
  id: number;
  text: string;
  options: string[];
  reverseScored: boolean;
}

export type ScoreCategory = "normal" | "monitor" | "atRisk" | "crisis";

/**
 * Get the score for a single option selection.
 * Normal questions: 0, 1, 2, 3
 * Reverse-scored questions: 3, 2, 1, 0
 */
export function getOptionScore(optionIndex: number, reverseScored: boolean): number {
  return reverseScored ? (3 - optionIndex) : optionIndex;
}

/**
 * Get the category for a total EPDS score.
 * 0-8: normal, 9-12: monitor, 13-19: atRisk, 20-30: crisis
 */
export function getScoreCategory(score: number): ScoreCategory {
  if (score <= 8) return "normal";
  if (score <= 12) return "monitor";
  if (score <= 19) return "atRisk";
  return "crisis";
}

/**
 * Calculate total score from an array of answers.
 * @param answers - Array of selected option indices (null = unanswered)
 * @param questions - The EPDS questions with reverseScored flag
 */
export function calculateTotalScore(
  answers: (number | null)[],
  questions: EPDSQuestion[]
): number {
  let total = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] !== null) {
      total += getOptionScore(answers[i]!, questions[i].reverseScored);
    }
  }
  return total;
}
