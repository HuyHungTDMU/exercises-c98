import React from 'react';
import {TransferToken} from "./components/transfer-token";
import {WalletBalance} from "./components/wallet-balance";
import {TransferTokenUsingPrivateKey} from "./components/transfer-token-private-key";
import {USDCBalance} from "./components/usdc-balance";
import {SetFullName} from "./components/set-full-name.";

function App() {
    return (
        <div className='flex flex-col items-center p-12 gap-7'>
            <h1 className='text-2xl font-bold text-sky-800'>Exercise 1</h1>
            <div className="grid grid-cols-3 gap-4">
                <WalletBalance/>
                <TransferTokenUsingPrivateKey/>
                <TransferToken/>
            </div>

            <h1 className='text-2xl font-bold text-sky-800'>Exercise 2</h1>
            <div className='flex items-center'>
                <USDCBalance/>
            </div>

            <h1 className='text-2xl font-bold text-sky-800'>Exercise 3</h1>
            <div className='flex items-center'>
                <SetFullName/>
            </div>
        </div>
    );
}

export default App;
