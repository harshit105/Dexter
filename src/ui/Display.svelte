<script>
    import {blockchainStore} from '../stores/blockchainData.js'
</script>

<div class='blocks'>
    {#each $blockchainStore.blocks as blk,i (blk)}
        <details>
            <summary>
                {blk.hashable.header.timeStamp} | Rs{blk.hashable.body.amount} | {blk.hashable.body.sender} &#129046; {blk.hashable.body.reciever}
            </summary>
            <div class='info'>
                <span class='tInfo'>
                    <div>Time : {blk.hashable.header.timeStamp}</div>
                    <div>Amount : {blk.hashable.body.amount}</div>
                    <div>Sender : {blk.hashable.body.sender}</div>
                    <div>Reciever : {blk.hashable.body.reciever}</div>
                </span>
                <span class='hInfo'>
                    <div>nonce : {blk.hashable.header.nonce}</div>
                    <div>Previous Hash : {blk.hashable.header.prevHash}</div>
                    <div>Current Hash : {blk.unhashable.hash}</div>
                </span>
                <div class='sig'>RSA Signature : {blk.hashable.header.bodyRSASig}</div>
            </div>
        </details>
        
    {:else}
        <div>Blockchain empty</div>
    {/each}
</div>

<style>
    .blocks{
        width:50%;
        position: absolute;
        top: 0px;
        left: 50%;
        text-align: left;
        overflow-x: hidden;
        overflow-y: auto;
    }

    div{
        overflow-wrap: break-word;
    }

    details{
        border-bottom: 1px solid #e0e0e0;
    }

    .info{
        padding-left: 2rem;
    }

    .tInfo{
        color:#ff3e00;
    }

    .hInfo{
        color: #3e00ff;
    }

    .sig{
        color: #00cc3e;
    }
</style>