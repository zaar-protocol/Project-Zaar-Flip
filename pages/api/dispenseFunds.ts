import { NextApiRequest, NextApiResponse } from 'next';
import { createWalletClient, getContract, http, parseEther } from 'viem';
import { mnemonicToAccount } from 'viem/accounts';
import { initia } from '@/config';
import { initiaTokenAbi, initiaTokenAddress } from '@/generated';
import { publicClient } from '@/client';
import { bech32 } from 'bech32';



const zaarTokenAddress = initiaTokenAddress;
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
    let address = req.query.address as string;
    //if address is bech32, convert to hex
    console.log("checking address: ", address);
    if (address?.match(/^init[a-zA-Z0-9]{38,39}$/)) {
      console.log("address is bech32");
      const { words: decodedWords } = bech32.decode(address);
      address = '0x' + Buffer.from(bech32.fromWords(decodedWords)).toString('hex');
      console.log(address);
    }
    
    if (!address?.match(/^0x[a-fA-F0-9]{40}$/) && !address?.match(/^init[a-zA-Z0-9]{38,39}$/)) {
      return res.status(400).json({ error: 'Invalid address format' });
    }

    const account = mnemonicToAccount(process.env.FAUCET_MNEMONIC as string);
    const faucetAddress = account.address;

    // Get current block
    const currentBlock = await publicClient.getBlockNumber();
    
    // Look back ~24 hours worth of blocks (assuming 1 minute block time)
    const fromBlock = currentBlock - BigInt(60) > BigInt(0) ? currentBlock - BigInt(60) : BigInt(0); // 24 * 60

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
      return res.status(400).json({ error: 'Please wait a minute between claims.' });
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