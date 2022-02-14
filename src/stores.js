import { writable } from 'svelte/store';

export const loaded = writable(false);

export const activePresentation = writable(0);