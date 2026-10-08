# svelte-testing

A todo list handwritten from scratch in Svelte 4 and TypeScript, no template. Built to learn the Svelte 4 model: `export let` props, `createEventDispatcher`, `bind:`, `$:` reactive statements, and `svelte/store`.

## Status

Working:

- Add a todo from the form
- Change a todo's status with a select (`todo`, `in_progress`, `done`)
- Filtered list via a derived store

Not built yet:

- Remove. The `remove` event and the `removeTodo` store helper exist, but `TodoItem.svelte` has no button that fires it.
- Filter buttons. The `filter` store exists and `visibleTodos` derives from it, but nothing sets it, so the list always shows everything.
- Remaining count in the heading
- localStorage persistence
- Styling

## Run

```bash
npm install
npm run dev
```

Type check, which `vite dev` does not do:

```bash
npm run check
```

## Layout

```
src/
  main.ts                      mounts App
  App.svelte                   heading, form, list
  lib/
    types.ts                   Todo, TodoStatus, filter and payload types
    stores/todos.ts            writables, deriveds, add / setStatus / remove helpers
    components/
      AddTodo.svelte           form, dispatches `add`
      TodoItem.svelte          one row, dispatches `statusChange` and `remove`
```

Components dispatch events and never touch the store directly. `App.svelte` is the only place that calls store helpers.

## Versions

Pinned to Svelte 4. `@sveltejs/vite-plugin-svelte` 3.x and Vite 5 are the last versions that target it. Newer plugin versions require Svelte 5.
