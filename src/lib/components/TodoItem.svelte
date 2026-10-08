<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { STATUSES, type Todo, type TodoStatus, type SetTodoStatusPayload, type RemoveTodoPayload } from "../types";
  export let todo: Todo;

  const dispatch = createEventDispatcher<{
    statusChange: SetTodoStatusPayload;
    remove: RemoveTodoPayload;
  }>();

  const handleTodoStatusChange = (event: Event & { currentTarget: HTMLSelectElement }): void => {
    dispatch("statusChange", { id: todo.id, status: event.currentTarget.value as TodoStatus });
  };
</script>

<li>
  <span>{todo.text}</span>
  <select value={todo.status} on:change={handleTodoStatusChange}>
    {#each STATUSES as status}
      <option value={status}>{status}</option>
    {/each}
  </select>
</li>
