import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20Abi } from "viem";
import {mainnet } from "wagmi/chains";
// import {abi} from "@/abis/abi.json";
import {abi} from "@/abis/abi"

export default defineConfig({
    out: "generated.ts",
    contracts: [
        {
            name: "zaarflip",
            address: "0xea61cfA2508A27b149D475C9DDD89C77846Baaa6",
            // address: "0x7BDe05B0E0CFEB70ac7C523788144c48427fD919", 
            // address: "0xb52d0c08B60d9772C2F923c54BC0c3f136BDEcB6",
            // address: "0x19b95Ef8a6B4C4CcbdEaa76Fe03eB86C89b6AB6C",
            // address: "0x1DC6df78F3f843476C5497864A63b11f5a3211EB",
            // address: "0x8D4909A8Bcb8c7bD6Fc106B7eEBF3A1f0a71bC7a",
            abi:abi
        },
        {
            name:"initiaToken",
            abi:erc20Abi,
            address:"0xd5dedc655a3000df6318151940b3311f7a4cc931",
        },
        {
            name: "erc20",
            abi: erc20Abi,
        },
        
    ],
    plugins: [
        react(),
    ],
    
    
});

/*
    plugins: [
        etherscan({
            apiKey: "HFV1I6KYJZFJGPE9E3AKMG6IRH9YUZV97N",//process.env.ETHERSCAN_API_KEY!,
            chainId: mainnet.id,
            contracts: [
                {
                    name: "zaarFlip",
                    address: {[mainnet.id]: "0x944330f3D4A425BEB9A24B8BAdd054f7B749e2f8",
                }
                },
                
            ],
        }),
        react(),
    ],*/