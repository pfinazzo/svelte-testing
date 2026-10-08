<script lang="ts">
  import { slide } from "svelte/transition";
  import { STATUSES, type Todo, type TodoStatus } from "../types";
  import { STATUS_LABELS } from "../labels";
  import { removeTodo, setTodoStatus } from "../stores/todos";

  export let todo: Todo;

  /*
    This row calls the store directly.

    It only exists to edit this app's todos, so routing every change up
    through the parent and back down would add two hops and no flexibility.
    The store's functions are the public way to change todos, and a component
    is as good a caller as any. Compare with AddTodoForm, which sends an event
    because it is meant to be reused.
  */
  const handleStatusChange = (event: Event & { currentTarget: HTMLSelectElement }): void =>
    setTodoStatus({ id: todo.id, status: event.currentTarget.value as TodoStatus });

  const handleRemove = (): void => removeTodo({ id: todo.id });
</script>

<!--
  `transition:slide` animates the row in and out. Svelte ships this in
  `svelte/transition` and the keyed each block in App.svelte is what lets it
  know which row left. Every control has a label, and the select shows
  display text from STATUS_LABELS rather than the raw value.
-->
<li class:done={todo.status === "done"} transition:slide={{ duration: 150 }}>
  <span class="text">{todo.text}</span>
  <label>
    Status
    <select value={todo.status} on:change={handleStatusChange}>
      {#each STATUSES as status}
        <option value={status}>{STATUS_LABELS[status]}</option>
      {/each}
    </select>
  </label>
  <button type="button" on:click={handleRemove} aria-label="Remove {todo.text}">Remove</button>
</li>

<style>
  li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
  }

  .text {
    flex: 1;
  }

  .done .text {
    text-decoration: line-through;
    opacity: 0.6;
  }
</style>
