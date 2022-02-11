import { writable, readable } from 'svelte/store';

export const showModal = writable(false);

export const showEngine = writable(false);

export const activeCamera = writable(1);