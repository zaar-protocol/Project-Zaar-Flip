import { createPublicClient, http } from 'viem';
import { initia } from '@/config';

//Viem client
export const publicClient = createPublicClient({
  chain: initia,
  transport: http()
});