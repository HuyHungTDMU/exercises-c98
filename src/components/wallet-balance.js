import React, {useState} from 'react';
import Web3 from "web3";
import {getShortAddress} from "../lib/utils/string";

const {ethereum} = window;

export const WalletBalance = () => {
    const [balance, setBalance] = useState('');
    const [accountAddress, setAccountAddress] = useState('');

    const getWalletBalance = async () => {
        if (ethereum) {
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            const account = accounts[0];
            if (account) {
                setAccountAddress(account);
                const web3 = new Web3(ethereum);
                const result = await web3.eth.getBalance(account)
                    .then((balance) => web3.utils.fromWei(balance, "ether"));
                setBalance(result);
            }
        }
    }

    return (
        <div className='flex flex-col gap-3 border border-sky-800 p-4 rounded-md'>
            <h2 className='text-xl text-sky-800'>{`${getShortAddress(accountAddress)} Balance: ${balance}`} </h2>
            <button className='bg-sky-800 text-white px-3 py-2 border rounded-md' onClick={getWalletBalance}>Get wallet
                balance default
            </button>
        </div>
    );
};
