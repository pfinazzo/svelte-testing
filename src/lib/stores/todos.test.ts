import { get } from "svelte/store";
import { beforeEach, describe, expect, it } from "vitest";
import {
  addTodo,
  openTodoCount,
  removeTodo,
  replaceTodos,
  setStatusFilter,
  setTodoStatus,
  todos,
  visibleTodos,
} from "./todos";

/*
  The store is tested on its own, with no component.

  `get` from svelte/store reads a store's current value once, which is what
  the `$` prefix does inside a component. Each test starts from an empty list
  by going through `replaceTodos`, the same function the app uses to load
  saved todos, so the tests never reach past the store's public functions.
*/
beforeEach(() => {
  replaceTodos({ todos: [] });
  setStatusFilter({ statusFilter: "all" });
});

describe("todos", () => {
  it("adds a todo with the status todo", () => {
    addTodo({ text: "Buy milk" });

    const [todo] = get(todos);
    expect(todo.text).toBe("Buy milk");
    expect(todo.status).toBe("todo");
    expect(todo.id).toBeTruthy();
  });

  it("changes a todo's status without touching the others", () => {
    addTodo({ text: "First" });
    addTodo({ text: "Second" });
    const [first, second] = get(todos);

    setTodoStatus({ id: first.id, status: "done" });

    const [updatedFirst, updatedSecond] = get(todos);
    expect(updatedFirst.status).toBe("done");
    expect(updatedSecond).toEqual(second);
  });

  it("removes a todo by id", () => {
    addTodo({ text: "Keep" });
    addTodo({ text: "Drop" });
    const [, drop] = get(todos);

    removeTodo({ id: drop.id });

    expect(get(todos).map(({ text }) => text)).toEqual(["Keep"]);
  });

  it("ignores a status change for an id that does not exist", () => {
    addTodo({ text: "Only" });
    const before = get(todos);

    setTodoStatus({ id: "missing", status: "done" });

    expect(get(todos)).toEqual(before);
  });
});

describe("openTodoCount", () => {
  it("counts todos that are not done", () => {
    addTodo({ text: "A" });
    addTodo({ text: "B" });
    addTodo({ text: "C" });
    const [a, b] = get(todos);
    setTodoStatus({ id: a.id, status: "in_progress" });
    setTodoStatus({ id: b.id, status: "done" });

    expect(get(openTodoCount)).toBe(2);
  });
});

describe("visibleTodos", () => {
  it("shows every todo when the filter is all", () => {
    addTodo({ text: "A" });
    addTodo({ text: "B" });

    expect(get(visibleTodos)).toHaveLength(2);
  });

  it("shows only todos matching the chosen status", () => {
    addTodo({ text: "A" });
    addTodo({ text: "B" });
    const [a] = get(todos);
    setTodoStatus({ id: a.id, status: "done" });

    setStatusFilter({ statusFilter: "done" });

    expect(get(visibleTodos).map(({ text }) => text)).toEqual(["A"]);
  });
});
