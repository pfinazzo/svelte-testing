import { STATUSES, type TodoStatus, type TodoStatusFilter } from "./types";

/*
  Words the user sees, kept apart from the values the code uses.

  `in_progress` is a fine value to store and compare. It is not fine to show
  on a button. These tables map each value to its display text. Typing them as
  `Record<...>` means a missing row is a compile error, so a new status cannot
  reach the screen without a label.
*/
export const STATUS_LABELS: Record<TodoStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  done: "Done",
};

export const STATUS_FILTERS: readonly TodoStatusFilter[] = ["all", ...STATUSES];

export const STATUS_FILTER_LABELS: Record<TodoStatusFilter, string> = {
  all: "All",
  ...STATUS_LABELS,
};
