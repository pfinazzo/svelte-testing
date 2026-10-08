/*
  The status list and the status type come from one place.

  `as const` tells TypeScript to remember the exact three strings instead of
  widening them to `string`. The type on the next line is then read off the
  array. Add a fourth status here and every select, label table and filter
  in the app either picks it up or fails to compile until you handle it.
*/
export const STATUSES = ["todo", "in_progress", "done"] as const;
export type TodoStatus = (typeof STATUSES)[number];
export type TodoStatusFilter = "all" | TodoStatus;

export type Todo = { id: string; text: string; status: TodoStatus };

// What each store function accepts. Named so the store and its tests share them.
export type AddTodoParams = { text: string };
export type SetTodoStatusParams = { id: string; status: TodoStatus };
export type RemoveTodoParams = { id: string };
export type ReplaceTodosParams = { todos: Todo[] };
export type SetStatusFilterParams = { statusFilter: TodoStatusFilter };
