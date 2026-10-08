import type { Todo } from "../types";

/*
  The only file that talks to localStorage.

  Keeping browser storage behind two small functions means the rest of the app
  never sees a storage key or a JSON call. Swapping this for an API later is a
  change to this file alone.
*/
const STORAGE_KEY = "svelte-testing.todos";

export const readStoredTodos = (): Todo[] => JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");

export const writeStoredTodos = ({ todos }: { todos: Todo[] }): void =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
