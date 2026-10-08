<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { AddTodoPayload } from "../types";
    let text = "";
    const dispatch = createEventDispatcher<{ add: AddTodoPayload }>();

    const handleSubmit = (): void => {
        const trimmed = text.trim();
        if (!trimmed) return;
        dispatch("add", { text: trimmed });
        text = "";
    };
</script>

<form on:submit|preventDefault={handleSubmit}>
    <input bind:value={text} placeholder="What needs doing?" />
    <button type="submit">Submit</button>
</form>
