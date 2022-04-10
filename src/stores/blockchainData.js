const { writable } = require("svelte/store");

const blockchainStore = writable([]);

let blockchain;
blockchainStore.subscribe(e=>blockchain=e)

export {blockchainStore,blockchain};