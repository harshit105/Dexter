import { writable } from "svelte/store";

//contains loaded keys
let publicKey = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHqqJM7cREcf4aW3LzBez5xhLIMA
Beqeggk00jMPmro0GcsMEHrs7Y3+tT2L5lwS+qtmS4iqTFnDXTlWA2Enp97QM+Hy
83zpleALRTatjyNmBsbW7cweYqESbhpQau5bgW8RBWS9jpXXdVMQDe9t//cYXTdm
xE5ANWVL8wDU/s2ZAgMBAAE=
-----END PUBLIC KEY-----`;


let privateKey;

let privateKeyStore = writable(undefined);

privateKeyStore.subscribe(e=>privateKey=e)

export {publicKey,privateKey,privateKeyStore};