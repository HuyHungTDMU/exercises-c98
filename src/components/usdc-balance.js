import React, {useState} from 'react';
import Web3 from "web3";
import erc20AB from "@openzeppelin/contracts/build/contracts/ERC20.json";

const {ethereum} = window;
const tokenAddress = "0xf97b79ece2f95e7b63a05f1fd73a59a1ef3e4fd7";  //Thunder Testnet USD
const endpointUrl = "https://testnet-rpc.thundercore.com"

export const USDCBalance = () => {
    const [balance, setBalance] = useState('');

    const getWalletBalance = async () => {
        if (ethereum) {
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            const account = accounts[0];
            if (account) {
                const httpProvider = new Web3.providers.HttpProvider(endpointUrl);
                const web3Client = new Web3(httpProvider);

                const contract = new web3Client.eth.Contract(erc20AB.abi, tokenAddress);

                const result = await contract.methods.balanceOf(account).call();
                setBalance(result);
            }
        }
    }

    return (
        <div className='flex flex-col gap-3 border border-sky-800 p-4 rounded-md'>
            <h2 className='text-xl text-sky-800'>{`Balance: ${balance}`} </h2>
            <button className='bg-sky-800 text-white px-3 py-2 border rounded-md' onClick={getWalletBalance}>Get USDC
                Balance
            </button>
        </div>
    );
};
