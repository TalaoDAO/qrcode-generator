const DIDKit = require('@spruceid/didkit-wasm-node');

exports.getDid = async function (privateKey) {
    try {
        const did = DIDKit.keyToDID("tz", privateKey);
        return did;
    } catch (error) {
        console.log(error)
    }
    return null;
    
};

exports.getVersion = async function () {
    try {
        return DIDKit.getVersion();
    } catch (error) {
        console.log(error)
    }
    return null;
    
};
