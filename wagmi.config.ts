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
            address: "0xE161Ff5fDC157fb69B1c6459c9aac7E6CcCdbfCA",
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