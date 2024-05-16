import {
    prepareWriteContract,
    writeContract,
    waitForTransaction,
  } from '@wagmi/core';

import { getAccount, readContract } from '@wagmi/core'
import { tokenAbi as abi, contractAddress } from '../constants';
import { ethers } from 'ethers';


export async function transferToken(address, amount) {
   console.log(contractAddress) 
    try {
        const request = await prepareWriteContract({
            address: contractAddress,
            abi: abi,
            functionName: 'transfer',
            args: [address,ethers.utils.parseEther(amount)],
        });
        const { hash } = await writeContract(request);
        const data = await waitForTransaction({
            confirmations: 1,
            hash,
        });
        if (data.status == 'success') {
            console.log(data);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
        return false;
    }
}

export async function approveSpender(address, amount) {
    try{
        const request = await prepareWriteContract({
            address: contractAddress,
            abi: abi,
            functionName: 'approve',
            args: [address, ethers.utils.parseEther(amount)],
        });
        const { hash } = await writeContract(request);
        const data = await waitForTransaction({
            confirmations: 1,
            hash,
        });
        if (data.status == 'success') {
            console.log(data);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
        return false;
    }
}

export async function transferFromAddress(from, to, amount) {
    console.log("from",from)
    console.log("to",to)
    console.log("amount",amount)
    try {
        const request = await prepareWriteContract({
            address: contractAddress,
            abi: abi,
            functionName: 'transferFrom',
            args: [from, to, ethers.utils.parseEther(amount)],
        });
        const { hash } = await writeContract(request);
        const data = await waitForTransaction({
            confirmations: 1,
            hash,
        });
        if (data.status == 'success') {
            console.log(data);
            return true;
        } else {
            return false;
        }
    }catch (error) {
        console.log(error)
        return false;
    }
}


export async function getBalance(address) {
    try{
        const result = await readContract({
            address: contractAddress,
            abi: abi,
            functionName: 'balanceOf',
            args: [address],
          });
        console.log("result is ",result)
            return ethers.utils.formatEther(result);
        } catch (error) {
        return null;
    }
}




