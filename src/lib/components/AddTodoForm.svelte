<script lang="ts">
  import { createEventDispatcher } from "svelte";

  /*
    This form sends an event instead of calling the store.

    It knows nothing about todos or where they live. It collects a line of
    text, hands it up as an `add` event, and clears itself. That makes it the
    one component here you could drop into a different app untouched. The
    generic on the dispatcher says what the event carries, so the parent's
    handler gets a typed `event.detail`.
  */
  const dispatch = createEventDispatcher<{ add: { text: string } }>();

  let text = "";

  const handleSubmit = (): void => {
    const trimmed = text.trim();
    if (!trimmed) return;
    dispatch("add", { text: trimmed });
    text = "";
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    New todo
    <input bind:value={text} placeholder="What needs doing?" />
  </label>
  <button type="submit">Add</button>
</form>
