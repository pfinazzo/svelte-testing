<script lang="ts">
  import { STATUS_FILTERS, STATUS_FILTER_LABELS } from "../labels";
  import { setStatusFilter, statusFilter } from "../stores/todos";
</script>

<!--
  `$statusFilter` reads the store even though the store only exports
  `subscribe`. That is all Svelte needs for the `$` prefix to work. The
  `class:active` directive adds the class when the expression is true, which
  replaces the usual string juggling for a conditional class.
-->
<nav aria-label="Filter todos by status">
  {#each STATUS_FILTERS as filter}
    <button
      type="button"
      class:active={$statusFilter === filter}
      aria-pressed={$statusFilter === filter}
      on:click={() => setStatusFilter({ statusFilter: filter })}
    >
      {STATUS_FILTER_LABELS[filter]}
    </button>
  {/each}
</nav>

<style>
  nav {
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  .active {
    font-weight: bold;
    text-decoration: underline;
  }
</style>
