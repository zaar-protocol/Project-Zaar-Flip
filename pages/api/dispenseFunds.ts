import { NextApiRequest, NextApiResponse } from 'next';
import { createWalletClient, getContract, http, parseEther } from 'viem';
import { mnemonicToAccount } from 'viem/accounts';
import { initia } from '@/config';
import { initiaTokenAbi } from '@/generated';
import { publicClient } from '@/client';


const zaarTokenAddress = "0x6ed1637781269560b204c27Cd42d95e057C4BE44";
const allowCors = (fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const address = req.query.address as string;
    
    if (!address?.match(/^0x[a-fA-F0-9]{40}$/)) {
      return res.status(400).json({ error: 'Invalid address format' });
    }

    const account = mnemonicToAccount(process.env.FAUCET_MNEMONIC as string);
    const faucetAddress = account.address;

    // Get current block
    const currentBlock = await publicClient.getBlockNumber();
    
    // Look back ~24 hours worth of blocks (assuming 1 minute block time)
    const fromBlock = currentBlock - BigInt(1440) > BigInt(0) ? currentBlock - BigInt(1440) : BigInt(0); // 24 * 60

    console.log("fromBlock: ", fromBlock);
    console.log("currentBlock: ", currentBlock);

    const logs = await publicClient.getLogs({
      address: zaarTokenAddress,
      event: {
        type: 'event',
        name: 'Transfer',
        inputs: [
          { type: 'address', name: 'from', indexed: true },
          { type: 'address', name: 'to', indexed: true },
          { type: 'uint256', name: 'value', indexed: false }
        ]
      },
      args: {
        from: faucetAddress,
        to: address as `0x${string}`
      },
      fromBlock,
      toBlock: currentBlock
    });

    if (logs.length > 0) {
      console.log("logs: ", logs);
      return res.status(400).json({ error: 'Please wait 24 hours between claims.' });
    }

    // Create wallet from mnemonic
    const walletClient = createWalletClient({
      account,
      chain: initia,
      transport: http()
    });

    // Send tokens
    const hash = await walletClient.writeContract({
      address: zaarTokenAddress,
      abi: initiaTokenAbi,
      functionName: 'transfer',
      args: [address as `0x${string}`, parseEther('100')]
    });

    res.status(200).json({ success: true, hash });
  } catch (error) {
    console.error('Faucet error:', error);
    res.status(500).json({ error: 'Failed to dispense funds' });
  }
}

export default allowCors(handler); 