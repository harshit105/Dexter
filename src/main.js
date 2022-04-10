import { createBlockChain } from './logic/blockchain';
const savedData = localStorage.getItem('data');
import {blockchainStore} from './stores/blockchainData.js'

//setup blockchain
blockchainStore.set(createBlockChain((blocks,transactions)=>{
	localStorage.setItem('data',JSON.stringify({blocks,transactions}));
	blockchainStore.update(e=>e);
},JSON.parse(savedData)));


//set up UI
import App from './ui/App.svelte';

const app = new App({
	target: document.body
});
