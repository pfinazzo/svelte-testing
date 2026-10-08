import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { preprocess } from "svelte/compiler";

export default {
    preprocess: vitePreprocess()
}