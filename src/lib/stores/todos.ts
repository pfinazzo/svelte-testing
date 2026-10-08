import { derived, writable, type Readable } from "svelte/store";
import type {
  AddTodoParams,
  RemoveTodoParams,
  ReplaceTodosParams,
  SetStatusFilterParams,
  SetTodoStatusParams,
  Todo,
  TodoStatus,
  TodoStatusFilter,
} from "../types";

/*
  The writable stores stay private.

  `writable` gives back an object with set, update and subscribe. If that
  object were exported, any component could write `$todos = []` and wipe the
  list without going through the functions below. So the writable lives only
  in this file, and what gets exported under the name `todos` is an object
  with just `subscribe`. Components can still read it as `$todos`, because
  Svelte only needs `subscribe` for that. Writing to it from a component is
  now a compile error. Every change comes through a named function here.
*/
const todoStore = writable<Todo[]>([]);
const statusFilterStore = writable<TodoStatusFilter>("all");

export const todos: Readable<Todo[]> = { subscribe: todoStore.subscribe };
export const statusFilter: Readable<TodoStatusFilter> = { subscribe: statusFilterStore.subscribe };

/*
  Values computed from the stores above.

  A derived store reruns its function whenever one of its inputs changes. The
  list of visible todos depends on both the todos and the filter, so it takes
  both. The open count depends only on the todos. Nothing ever sets these by
  hand, so they cannot drift out of step with the data.
*/
const OPEN_BY_STATUS: Record<TodoStatus, boolean> = {
  todo: true,
  in_progress: true,
  done: false,
};

const isOpen = ({ status }: Todo): boolean => OPEN_BY_STATUS[status];

export const visibleTodos = derived([todos, statusFilter], ([$todos, $statusFilter]) =>
  $statusFilter === "all" ? $todos : $todos.filter((todo) => todo.status === $statusFilter),
);

export const openTodoCount = derived(todos, ($todos) => $todos.filter(isOpen).length);

/*
  The only way to change todos.

  Each function hands `update` a callback that receives the current list and
  returns a new one. None of them push into, splice or assign onto the list
  they were given. That matters in Svelte 4: the store only notifies
  subscribers when it is handed a new value, so a mutated array would leave
  the screen stale.
*/
const createTodo = ({ text }: AddTodoParams): Todo => ({ id: crypto.randomUUID(), text, status: "todo" });

export const addTodo = ({ text }: AddTodoParams): void =>
  todoStore.update((current) => [...current, createTodo({ text })]);

export const setTodoStatus = ({ id, status }: SetTodoStatusParams): void =>
  todoStore.update((current) => current.map((todo) => (todo.id === id ? { ...todo, status } : todo)));

export const removeTodo = ({ id }: RemoveTodoParams): void =>
  todoStore.update((current) => current.filter((todo) => todo.id !== id));

export const replaceTodos = ({ todos: next }: ReplaceTodosParams): void => todoStore.set(next);

export const setStatusFilter = ({ statusFilter: next }: SetStatusFilterParams): void => statusFilterStore.set(next);
