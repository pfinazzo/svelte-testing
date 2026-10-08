<script lang="ts">
    import AddTodo from "./lib/components/AddTodo.svelte";
    import TodoItem from "./lib/components/TodoItem.svelte";
    import { addTodo, removeTodo, setStatus, visibleTodos } from "./lib/stores/todos";
    import type { AddTodoPayload, SetTodoStatusPayload, RemoveTodoPayload } from "./lib/types";

    // handler types
    const handleAdd = (event: CustomEvent<AddTodoPayload>): void => addTodo(event.detail);
    const handleStatusChange = (event: CustomEvent<SetTodoStatusPayload>): void => setStatus(event.detail);
    const handleRemove = (event: CustomEvent<RemoveTodoPayload>): void => removeTodo(event.detail);
    
</script>

<h1>Todos</h1>
<AddTodo on:add={handleAdd} />
<ul>
    <!-- (todo.id) tells Svelte which DOM node belongs to which item, so removing one from the middle doesn't shift every row's state  -->
    {#each $visibleTodos as todo (todo.id) }
        <TodoItem {todo} on:statusChange={handleStatusChange} on:remove={handleRemove}/>
    {:else}
        <li>Nothing Here</li>
    {/each}
</ul>

