import { generateHash, generateSignature, verifySignature } from './encryption.js';
import { publicKey, privateKey } from '../stores/keyStore.js';

const proofOfWorkZeroes = 3;

const createBlock = (prevHash,sender,reciever,amount)=>{
    //block body
    let body = {
        sender,
        reciever,
        amount
    }

    //block header
    let header = {
        prevHash,
        timeStamp: (new Date()).toUTCString(),
        nonce: 0,
        bodyRSASig:generateSignature(body,privateKey)
    }

    //return block
    return {
        hashable:{header, body},
        unhashable:{hash: ''}
    };
}

const verifyBlockAuthor = (block)=>{
    return verifySignature(block.hashable.body,block.hashable.header.bodyRSASig,publicKey);
}

const verifyBlockHash = (block)=>{
    return (generateHash(block.hashable) === block.unhashable.hash);
}

const verifyBlock = (block)=>{
    return (verifyBlockAuthor(block) && verifyBlockHash(block));
}

const mineBlock = (block)=>{
    while(true){
        let hash = generateHash(block.hashable);
        
        let mined = true;
        for(let i = 0 ; i < Math.min(proofOfWorkZeroes,hash.length) ; ++i){
            if(hash.charAt(i) !== '0'){
                mined = false;
                break;
            }
        }

        if(mined){
            block.unhashable.hash = hash;
            break;
        }

        block.hashable.header.nonce++;
    }
}


export {createBlock, verifyBlockAuthor, verifyBlockHash, verifyBlock, mineBlock};