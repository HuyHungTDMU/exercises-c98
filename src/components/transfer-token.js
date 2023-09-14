import React, {useState} from 'react';
import Web3 from "web3";

const {ethereum} = window;
const defaultAccount = '0x2F08f09f05B09B3b8eB950ee894236cAeb40b471'

export const TransferToken = () => {
    const [toAddress, setToAddress] = useState(defaultAccount);
    const [amount, setAmount] = useState(0);
    const [status, setStatus] = useState('');

    const handleTransfer = async () => {
        if (!toAddress || !amount) {
            setStatus('Please enter both address and amount.');
            return;
        }

        try {
            if (ethereum) {
                const web3 = new Web3(ethereum);
                const accounts = await web3.eth.getAccounts();
                const fromAddress = accounts[0];

                ethereum
                    .request({
                        method: 'eth_sendTransaction',
                        params: [
                            {
                                from: fromAddress,
                                to: toAddress,
                                value: web3.utils.numberToHex(web3.utils.toWei(amount, 'ether')),
                            },
                        ],
                    })
                    .then((txHash) => {
                        setStatus(`Transfer successful! txHash: ${txHash}`);
                        console.log(txHash)
                    })
                    .catch((error) => console.error(error));
            }
        } catch (error) {
            setStatus('Error: ' + error.message);
        }
    };

    return (
        <div className='flex flex-col gap-3 text-sky-800 border border-sky-800 p-4 rounded-md'>
            <h2 className='text-xl'>Transfer ERC20 Tokens</h2>
            <div>
                <label>To Address:</label>
                <input
                    className='w-full border border-sky-800 px-3 py-2 rounded-md'
                    type="text"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
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
