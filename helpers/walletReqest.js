exports.validateCredentials = async function (receivedCredentials) {
    const rc = await JSON.parse(receivedCredentials);
    const creds = rc.verifiableCredential;

    if (!creds)
        return null;

    if (Array.isArray(creds)) {
        if (creds.length == 0) {
            return null;
        }
        for (let i = 0; i < creds.length; i++) {
            if (creds[i].credentialSubject.type === 'EmailPass') {
                return creds[i].credentialSubject.email;
            }
        }
    } else {
        if (creds.credentialSubject.type === 'EmailPass') {
            return creds.credentialSubject.email;
        }
    }

    return null;
}