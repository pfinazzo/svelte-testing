<script lang="ts">
  import { onMount } from "svelte";
  import AddTodoForm from "./lib/components/AddTodoForm.svelte";
  import StatusFilterBar from "./lib/components/StatusFilterBar.svelte";
  import TodoItem from "./lib/components/TodoItem.svelte";
  import { readStoredTodos, writeStoredTodos } from "./lib/storage/todoStorage";
  import { addTodo, openTodoCount, replaceTodos, todos, visibleTodos } from "./lib/stores/todos";

  let hasLoadedStoredTodos = false;

  /*
    Loading runs once, after the component is on the page.

    `onMount` is the safe place for browser APIs like localStorage, because
    Svelte can also render components on a server where those do not exist.
    The flag flips to true only after the stored list is in the store, which
    keeps the save below from firing first and overwriting storage with an
    empty list.
  */
  onMount(() => {
    replaceTodos({ todos: readStoredTodos() });
    hasLoadedStoredTodos = true;
  });

  /*
    Saving reruns whenever something it reads changes.

    A statement marked `$:` is rerun by Svelte each time one of the variables
    it mentions is assigned. This one mentions `hasLoadedStoredTodos` and
    `$todos`, so it runs after loading and after every add, status change or
    removal. There is no list of things to watch. Svelte reads the statement
    and works it out.
  */
  $: if (hasLoadedStoredTodos) writeStoredTodos({ todos: $todos });

  const handleAddTodo = (event: CustomEvent<{ text: string }>): void => addTodo(event.detail);
</script>

<main>
  <h1>Todos <small>{$openTodoCount} open</small></h1>
  <AddTodoForm on:add={handleAddTodo} />
  <StatusFilterBar />
  <!-- The key in parentheses tells Svelte which row is which, so removing one from the middle moves that row only. -->
  <ul>
    {#each $visibleTodos as todo (todo.id)}
      <TodoItem {todo} />
    {:else}
      <li>Nothing here</li>
    {/each}
  </ul>
</main>

<style>
  main {
    max-width: 32rem;
    margin: 2rem auto;
    font-family: system-ui, sans-serif;
  }

  h1 small {
    font-size: 0.5em;
    font-weight: normal;
    opacity: 0.6;
  }

  ul {
    list-style: none;
    padding: 0;
  }
</style>
