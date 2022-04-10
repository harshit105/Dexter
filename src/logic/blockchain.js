import {createBlock, verifyBlockAuthor, verifyBlock, mineBlock} from './block.js';

const createBlockChain = (update,from)=>{
    let blocks = [];
    let transactions = [];

    const addTransaction = (sender,reciever,amount)=>{
        transactions.push({sender,reciever,amount});
        update(blocks,transactions);
    }

    const verifyBlocks = ()=>{
        if(blocks.length === 0)return true;
        if(!verifyBlock(blocks[0]))return false;

        for(let i = 1 ; i < blocks.length; ++i){
            if(!verifyBlock(blocks[i]))return false;
            if(blocks[i].hashable.header.prevHash !== blocks[i-1].unhashable.hash)return false;
        }

        return true;
    }

    if(from){
        blocks = from.blocks;
        transactions = from.transactions;
        if(!verifyBlocks()){
            blocks = [];
            transactions = [];
        }
        update(blocks,transactions);
    }

    const handleTransactions = ()=>{
        for(let i = 0 ; i < transactions.length; ++i){
            //current transaction
            let cTransaction = transactions[i];

            //get previous block hash if not genesis block
            let prevHash = '0000000000000000000000000000000000000000000000000000000000000000';
            if(blocks.length > 0)prevHash = blocks[blocks.length-1].unhashable.hash;
            
            //create block
            let block = createBlock(prevHash,cTransaction.sender,cTransaction.reciever,cTransaction.amount);

            //verify author before mining
            if(!verifyBlockAuthor(block)){
                window.alert(`Transaction ${JSON.stringify(cTransaction)} was not processed. Unauthorized transaction.`);
                continue;
            }

            //mine block
            mineBlock(block);

            //add block to block chain
            blocks.push(block);
        }

        while(transactions.length)transactions.pop();
        
        update(blocks,transactions);

        //poll for transactions
        const pollDelay = 500;
        setTimeout(handleTransactions,pollDelay);
    }
    //initital call
    handleTransactions();

    const blockChain = {
        blocks,
        transactions,
        addTransaction,
    }

    return blockChain;
}

export {createBlockChain};