const crypto = require('crypto');

//returns sha256 hash of the stringified object
const generateHash = (obj)=>{
    return crypto.createHash('sha256').update(JSON.stringify(obj)).digest('hex');
}

//create RSA signature for the stringified object using private key
const generateSignature = (obj,privateKey)=>{

    try{
        //ensure key is in ascii
        let key = privateKey.toString('ascii');

        //generate signature
        let sign = crypto.createSign('RSA-SHA256');
        sign.update(JSON.stringify(obj));
        let signature = sign.sign(key, 'hex');

        // return signature
        return signature;
    }catch(e){
        console.warn(e);
        return '';
    }
    
}


//check if the signature for the given object was obtained using the correct kee
const verifySignature = (obj,signature,publicKey)=>{
    try{
        //ensure key is in ascii
        publicKey = publicKey.toString('ascii');

        //verify
        const publicKeyBuf = Buffer.from(publicKey, 'ascii');
        const signatureBuf = Buffer.from(signature, 'hex');

        const verifier = crypto.createVerify('RSA-SHA256');
        verifier.update(JSON.stringify(obj), 'ascii');
        const result = verifier.verify(publicKeyBuf, signatureBuf);

        //return result
        return result;
    }catch(e){
        console.warn(e);
        return false;
    }
    
}

export {generateHash, generateSignature, verifySignature};