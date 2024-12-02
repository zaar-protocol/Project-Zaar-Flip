import { defineChain } from "thirdweb";

export const thirdwebInitiaChain = defineChain({
    id: 4303131403034904,
    name: "initia",
    rpc: 'https://json-rpc.minievm-2.initia.xyz',
    nativeCurrency: { name: 'GAS', symbol: 'GAS', decimals: 18 }
})

