# svelte-testing

A todo list handwritten from scratch in Svelte 4 and TypeScript, no template. Built to show the Svelte 4 model in a small space: stores, `export let` props, `createEventDispatcher`, `bind:`, `$:` reactive statements, keyed `each` blocks and transitions.

Every design choice has a comment block next to it explaining the reason in plain words.

## What it does

- Add a todo
- Change a todo's status with a select (To do, In progress, Done)
- Remove a todo
- Filter the list by status
- Show how many todos are still open
- Save to localStorage and load it back on refresh

## Run

```bash
npm install
npm run dev
```

The other scripts:

```bash
npm run check    # type check .svelte and .ts files, which vite dev does not do
npm test         # store tests with Vitest
npm run format   # Prettier, including .svelte files
npm run build    # production build to dist/
```

## Layout

```
src/
  main.ts                        mounts App
  App.svelte                     heading, form, filter bar, list, localStorage load and save
  lib/
    types.ts                     STATUSES, Todo, TodoStatus, filter and params types
    labels.ts                    display text for statuses and filters
    storage/todoStorage.ts       the only file that touches localStorage
    stores/todos.ts              private writables, derived values, the functions that change them
    stores/todos.test.ts         store tests
    components/
      AddTodoForm.svelte         sends an `add` event, knows nothing about the store
      TodoItem.svelte            one row, calls the store directly
      StatusFilterBar.svelte     filter buttons, calls the store directly
```

## Choices worth knowing

The store exports only `subscribe` for `todos` and `statusFilter`. Components can read them with the `$` prefix but cannot assign to them. Every change goes through a named function in `stores/todos.ts`.

`AddTodoForm` dispatches an event because it is reusable. `TodoItem` and `StatusFilterBar` call store functions directly because they exist only to edit this app's data. Both patterns are on purpose, and the comments in each file say why.

The status values and the status type come from one `as const` array in `types.ts`. Adding a status is one line there, and the label table and filter list fail to compile until they handle it.

## Versions

Pinned to Svelte 4. `@sveltejs/vite-plugin-svelte` 3.x, `prettier-plugin-svelte` 3.x and Vite 5 are the last lines that target it. Newer majors of each require Svelte 5.
