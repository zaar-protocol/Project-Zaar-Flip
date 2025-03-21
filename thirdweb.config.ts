import { defineChain } from "thirdweb";
import { initia } from "@/config";
export const thirdwebInitiaChain = defineChain({
    id: initia.id,
    name: initia.name,
    rpc: initia.rpcUrls.default.http[0],
    nativeCurrency: initia.nativeCurrency,
})

