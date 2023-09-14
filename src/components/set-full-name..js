import React, {useState} from 'react';
import Web3 from "web3";

const {ethereum} = window;
const endpointUrl = "https://bsc-testnet.publicnode.com"
const contractAddress = "0xc06fdEbA4F7Fa673aCe5E5440ab3d495133EcE7a";
const privateKey = "0x3d3678effc7de1afd27ef74a593d9ab6b4b1786014834289e87872f826342a1d"

const contractABI = [{
    "inputs": [],
    "name": "get",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "string", "name": "data", "type": "string"}],
    "name": "set",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}]

export const SetFullName = () => {
    const [fullName, setFullName] = useState('');
    const [status, setStatus] = useState('');

    const handleTransfer = async () => {
        if (!fullName) {
            setStatus('Please enter full name.');
            return;
        }

        try {
            if (ethereum) {
                const web3 = new Web3(endpointUrl);
                const contract = new web3.eth.Contract(
                    contractABI,
                    contractAddress
                );

                const account = web3.eth.accounts.privateKeyToAccount(privateKey);
                const nonce = await web3.eth.getTransactionCount(account.address);
                const gasPrice = await web3.eth.getGasPrice();
                const networkId = await web3.eth.net.getId();

                const rawTransaction = {
                    to: contract._address,
                    data: contract.methods.set(fullName).encodeABI(),
                };

                const gas = await web3.eth.estimateGas(rawTransaction);

                rawTransaction.gasPrice = gasPrice;
                rawTransaction.nonce = nonce;
                rawTransaction.chainId = networkId;
                rawTransaction.gas = gas;

                console.log("🚀 ~ file: index.js:45 ~ main ~ gas", gas);

                const signedTransaction = await account.signTransaction(rawTransaction);

                const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
                console.log("🚀 ~ file: index.js:40 ~ main ~ receipt", receipt)

                const tx = await contract.methods.get().call()
                setStatus('Set name successful: ' + tx);
            }
        } catch (error) {
            setStatus('Error: ' + error.message);
        }
    };

    return (
        <div className='flex flex-col gap-3 text-sky-800 border border-sky-800 p-4 rounded-md'>
            <h2 className='text-xl'>Set name</h2>
            <div>
                <label>Full name:</label>
                <input
                    className='w-full border border-sky-800 px-3 py-2 rounded-md'
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
            </div>
            <button className='bg-sky-800 text-white px-3 py-2 border rounded-md' onClick={handleTransfer}>Transfer
            </button>

            {status && <div>{status}</div>}
        </div>
    );
};
