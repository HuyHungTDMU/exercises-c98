import React, {useState} from 'react';
import {Web3} from "web3";
import erc20ABI from "@openzeppelin/contracts/build/contracts/ERC20.json";

const defaultEndpointUrl = "https://goerli.blockpi.network/v1/rpc/public"
const defaultPrivateKey = "0x3d3678effc7de1afd27ef74a593d9ab6b4b1786014834289e87872f826342a1d"
const defaultToAddress = '0x2F08f09f05B09B3b8eB950ee894236cAeb40b471'
const defaultTokenContractAddress = '0x8d27431c473E83611847D195d325972e80D1F4c1'

export const TransferTokenUsingPrivateKey = () => {
    const [toAddress, setToAddress] = useState(defaultToAddress);
    const [privateKey, setPrivateKey] = useState(defaultPrivateKey);
    const [httpProvider, setHttpProvider] = useState(defaultEndpointUrl);
    const [tokenContractAddress, setTokenContractAddress] = useState(defaultTokenContractAddress);
    const [amount, setAmount] = useState(0);
    const [status, setStatus] = useState('');

    const handleTransfer = async () => {
        if (!privateKey || !amount || !amount) {
            setStatus('Please enter private key, both address and amount.');
            return;
        }

        try {
            const web3 = new Web3(httpProvider);
            const contract = new web3.eth.Contract(
                erc20ABI.abi,
                tokenContractAddress
            );
            const account = web3.eth.accounts.privateKeyToAccount(privateKey);
            const nonce = await web3.eth.getTransactionCount(account.address);
            const gasPrice = await web3.eth.getGasPrice();
            const networkId = await web3.eth.net.getId();
            const amountWei = web3.utils.toWei(amount, 'ether');

            const rawTransaction = {
                to: contract._address,
                data: contract.methods.transfer(toAddress, amountWei).encodeABI(),
            };

            const gas = await web3.eth.estimateGas(rawTransaction);

            rawTransaction.gasPrice = gasPrice;
            rawTransaction.nonce = nonce;
            rawTransaction.chainId = networkId;
            rawTransaction.gas = gas;

            console.log("🚀 ~ file: index.js:45 ~ main ~ gas", gas);

            const signedTransaction = await account.signTransaction(rawTransaction);

            const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
            console.log("🚀 ~ file: index.js:40 ~ main ~ receipt", receipt);
            setStatus(`Transfer successful! txHash`);
        } catch (error) {
            console.log(error)
            setStatus('Error: ' + error.message);
        }
    };

    return (
        <div className='flex flex-col gap-3 text-sky-800 border border-sky-800 p-4 rounded-md'>
            <h2 className='text-xl'>Transfer ERC20 Tokens Using Private Key</h2>
            <div>
                <label>Private key:</label>
                <input
                    className='w-full border border-sky-800 px-3 py-2 rounded-md'
                    type="text"
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                />
            </div>
            <div>
                <label>To address:</label>
                <input
                    className='w-full border border-sky-800 px-3 py-2 rounded-md'
                    type="text"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                />
            </div>
            <div>
                <label>Http provider:</label>
                <input
                    className='w-full border border-sky-800 px-3 py-2 rounded-md'
                    type="text"
                    value={httpProvider}
                    onChange={(e) => setHttpProvider(e.target.value)}
                />
            </div>
            exercises-c98
            <div>
                <label>Token contract address:</label>
                <input
                    className='w-full border border-sky-800 px-3 py-2 rounded-md'
                    type="text"
                    value={tokenContractAddress}
                    onChange={(e) => setTokenContractAddress(e.target.value)}
                />
            </div>
            <div>
                <label>Amount:</label>
                <input
                    className='w-full border border-sky-800 px-3 py-2 rounded-md'
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <button className='bg-sky-800 text-white px-3 py-2 border rounded-md' onClick={handleTransfer}>Transfer
            </button>

            {status && <div>{status}</div>}
        </div>
    );
};
