import { writable, derived } from "svelte/store";
import type {
    // core
    Todo,
    TodoList,
    TodoStatusFilter,
    TodoStatus,

    // helper payloads
    AddTodoPayload,
    SetTodoStatusPayload,
    RemoveTodoPayload
} from "../types";

// filtered directly on status
const filteredOnStatusTodos = ({ todos, filter }: { todos: TodoList, filter: TodoStatusFilter }) => todos.filter((todo) => todo.status === filter);

// branches off to show all todos if the filter is "all" since "all" not a todo status
const toVisibleTodos = ([$todos, $filter]: [TodoList, TodoStatusFilter]) => $filter === "all" ? $todos : filteredOnStatusTodos({ todos: $todos, filter: $filter });

const IS_OPEN: Record<TodoStatus, boolean> = {
    todo: true,
    in_progress: true,
    done: false,
}

// writables
export const todos = writable<TodoList>([]);
export const filter = writable<TodoStatusFilter>("all");


// readables
// none for now but if we had an external source (i.e. other users creating todos on your list pushed on from web socket etc) 

// derived
export const visibleTodos = derived([todos, filter], toVisibleTodos);
export const remainingCount = derived(todos, $todos => $todos.filter((todo) => IS_OPEN[todo.status]).length);


// transforms
const toTodo = ({ text }: AddTodoPayload): Todo => ({ text, status: "todo", id: crypto.randomUUID() });

// update helpers
export const addTodo = ({ text }: AddTodoPayload) => todos.update((currentTodos) => [...currentTodos, toTodo({ text })]);
export const setStatus = ({ id, status }: SetTodoStatusPayload) => todos.update((currentTodos) => currentTodos.map(todo => todo.id === id ? { ...todo, status } : todo));
export const removeTodo = ({ id }: RemoveTodoPayload) => todos.update((currentTodos) => currentTodos.filter(todo => todo.id !== id));
