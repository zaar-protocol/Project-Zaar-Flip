import { createThirdwebClient } from "thirdweb";
import { createPublicClient, http } from 'viem';
import { initia } from '@/config';

export const client = createThirdwebClient({clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string});

//Viem client
export const publicClient = createPublicClient({
  chain: initia,
  transport: http()
});