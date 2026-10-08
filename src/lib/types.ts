// core types
export const STATUSES = ["todo", "in_progress", "done"] as const;
export type TodoStatus = (typeof STATUSES)[number];
export type Todo = { id: string; text: string; status: TodoStatus; };
export type TodoList = Todo[];
export type TodoStatusFilter = "all" | TodoStatus;

// helper payloads 
export type AddTodoPayload = { text: string };
export type SetTodoStatusPayload = { id: string; status: TodoStatus; };
export type RemoveTodoPayload = { id: string };

