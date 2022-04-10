<script>
    import {privateKeyStore} from '../stores/keyStore.js'
    const changeKey = (e)=>{
        var fr = new FileReader();
        fr.onload = ()=>{
            privateKeyStore.set(fr.result);
        }
        fr.readAsText(e.target.files[0]);
    }

    let customerName = 'customer Name';
    let from = 'customer';
    let amount = 0;

    import {blockchain} from '../stores/blockchainData.js'
    const addTransaction = ()=>{
        if(from==='customer'){
            var sender = customerName;
            var reciever = 'Dexter';
        }else{
            var sender = 'Dexter';
            var reciever = customerName;
        }
        blockchain.addTransaction(sender,reciever,amount)
    }
</script>

<div>
    <h4>
        Assignment 1, Group: G07<br>
        Abhishek Khurana [2018A3PS0621H]<br>
        Akanksha Vinod Hublikar [2018AAPS0317H]<br>
        Harshit Bansal [2018B5A70601H]<br>
    </h4>
    <br>
    Dexter's private key <input type='file' multiple='false' on:change={changeKey}/>
    <br><br>
    <form>
        Rs <input type='number' bind:value={amount}>
        <br>
        <select bind:value={from}>
            <option value="customer">to Dexter from</option>
            <option value="Dexter">from Dexter to</option>
        </select>
        <br>
        <input type='text' bind:value={customerName} />
        <br><br>
        <input type='button' value="Add Transaction" on:click={addTransaction}/>
    </form>
</div>

<style>
    div{
        width:50%;
        position: absolute;
        top: 0px;
        left: 0%;
        overflow: hidden;
        text-align: left;
        padding-left: 1rem;
        padding-right: 1rem;
        box-sizing: border-box;
    }

    input{
        display:inline-block;
        width: 20rem;
        min-width: min-content;
    }

    h4{
        padding-left: 2rem;
        padding-bottom: 2rem;
        text-align: left;
        border-bottom: 1px solid #eee;
    }

    form{
        padding-top: 1rem;
        text-align: center;
        border-top: 1px solid #eee;
    }

</style>