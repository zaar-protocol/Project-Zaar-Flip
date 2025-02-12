import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20Abi } from "viem";
import {mainnet } from "wagmi/chains";
// import {abi} from "@/abis/abi.json";
import {abi, plinkoAbi, zaarStakingAbi} from "@/abis/abi"
import { zaarflipAbi } from "./generated";

export default defineConfig({
    out: "generated.ts",
    contracts: [
        {
            name: "zaarflip",
            abi:abi,
            address: "0xe0E2858078C46bbF58973D2fFAE44ebD537a365F",
        },
        {
            name:"initiaToken",
            abi:erc20Abi,
            address:"0x6ed1637781269560b204c27Cd42d95e057C4BE44",
        },
        {
            name:"staking", 
            abi:zaarStakingAbi,
            address:"0x7E943A1DbDC631A00109cf2d98639a6B3442ed0c",
        },
        {
            name:"plinko",
            abi:plinkoAbi,
            address:"0x6283dA52Bce2D01C885d6977A5746fF7eA2e555D",
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