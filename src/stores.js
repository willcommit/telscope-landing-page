import { writable } from 'svelte/store';

export const loaded = writable(false);

export const activePresentation = writable(0);

export const presentations = writable([
    {id: 1, slide: "Start", text: "", sceneCamera: { x: 120 , y:40, z:20, lookAtX: -70, lookAtY: 30, lookAtZ: -20 }},
    {id: 2, slide: "Bridge", text: "", activeModel: "bridge", sceneCamera: { x: -10 , y:30, z:50, lookAtX: 20, lookAtY: 0, lookAtZ: -30 }},
    {id: 3, slide: "Ship Solution", text: "", activeModel: "network",sceneCamera: { x: -30, y:20, z:15, lookAtX: 20, lookAtY: 5, lookAtZ:20 }},
    {id: 4, slide: "Shore Connection", text: "", activeModel: "antenna", showSignal: true, sceneCamera: { x: 110 , y:40, z:0, lookAtX: -10, lookAtY: 30, lookAtZ: -10 }},
    {id: 5, slide: "Engine Log", text: "", activeModel: "ecr", sceneCamera: { x: 30 , y:30, z:-60, lookAtX: -40, lookAtY: 0, lookAtZ: 20 }},
    {id: 6, slide: "Tank Log", text: "", activeModel: "tanks", sceneCamera: { x: -750 , y:20, z:50, lookAtX: -600, lookAtY: 15, lookAtZ: 100 }}
])