import { defineChain } from "thirdweb";

export const thirdwebInitiaChain = defineChain({
    id: 2285582334439122,
    name: "zaar-testnet-4",
    rpc: 'https://jsonrpc-0-zaar-testnet-4.anvil.asia-southeast.initia.xyz/',
    nativeCurrency: { name: 'fZAAR', symbol: 'fZAAR', decimals: 18 }
})

