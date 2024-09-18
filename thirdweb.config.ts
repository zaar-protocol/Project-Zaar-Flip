import { defineChain } from "thirdweb";

export const thirdwebInitiaChain = defineChain({
    id: 2594729740794688,
    name: "Initia",
    rpc: 'https://json-rpc.stoneevm-16.initia.xyz',
    nativeCurrency: { name: 'GAS', symbol: 'GAS', decimals: 18 }
})

