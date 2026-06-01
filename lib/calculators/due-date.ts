/**
 * Calculate due date from last menstrual period (LMP).
 * Standard: LMP + 280 days = estimated due date.
 */
export function calculateDueDate(lmpDate: Date): Date {
  const due = new Date(lmpDate);
  due.setDate(due.getDate() + 280);
  return due;
}

/**
 * Calculate the current pregnancy week from the due date.
 * Due date - 280 days = LMP, then weeks since LMP.
 */
export function calculateWeekFromDueDate(dueDate: Date): number {
  const lmp = new Date(dueDate);
  lmp.setDate(lmp.getDate() - 280);
  const now = new Date();
  const diffMs = now.getTime() - lmp.getTime();
  const weeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
  return Math.max(1, Math.min(40, weeks));
}

/**
 * Get trimester from week number.
 */
export function getTrimester(week: number): 1 | 2 | 3 {
  if (week <= 12) return 1;
  if (week <= 27) return 2;
  return 3;
}

/**
 * Calculate pregnancy progress percentage.
 */
export function getProgress(currentWeek: number): number {
  return Math.round((currentWeek / 40) * 100);
}
