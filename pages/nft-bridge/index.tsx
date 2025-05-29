// import { StarField } from "@/components/star-field";
// import { Header } from "@/components/header"; // Fixed casing issue
// import React, { useEffect, useState } from "react";
// import { convertToInitiaAddress } from "@/utils/convertInitiaAddress";
// import { useAccount } from "wagmi";
// import axios from "axios";
// import type { AssetList, Chain } from "@initia/initia-registry-types";
// import { Tx } from "@initia/utils";
// import intergazeChain from "@/lib/constants/intergaze-chain.json";
// import zaarChain from "@/lib/constants/zaar-chain.json";

// function NftBridge() {
//   const { address } = useAccount();
//   const [initiaAddress, setInitiaAddress] = useState<string | null>(null);
//   const [nfts, setNfts] = useState<any[]>([]);
//   const [selectedNft, setSelectedNft] = useState<any>(null);

//   useEffect(() => {
//     if (address) {
//       setInitiaAddress(convertToInitiaAddress(address));
//     }
//   }, [address]);

//   useEffect(() => {
//     const getNfts = () => {
//       if (!initiaAddress) return;
//       fetch(
//         `https://rest.intergaze-apis.com/indexer/nft/v1/collections/by_account/${initiaAddress}`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data);
//           setNfts(data);
//         });
//     };
//     getNfts();
//   }, [initiaAddress]);

//   async function bridgeNftToZaar() {
//     if (!initiaAddress) return;

//     const layer1 = intergazeChain as Chain;
//     const layer = layer1;
//     const { data: assetlistL1 } = await axios.get<AssetList>(
//       layer1.metadata?.assetlist!
//     );
//     const { assets: assetsL1 } = assetlistL1;
//     const assets = assetsL1; // Assets of the sending layer: Similarly, since the transfer is from L1, assign the assets of L1 as is.
//     const modules = { dex_utils: "", swap_transfer: "" };

//     const collectionAddress =
//       "0xc65648f1f04ea11e679989c9575982d43d69b2e1d7177df806aec4bad64e25ca";
//     const testToken = {
//       collection_addr:
//         "0xc65648f1f04ea11e679989c9575982d43d69b2e1d7177df806aec4bad64e25ca",
//       collection_name: "Initia Usernames",
//       nft: {
//         collection: { inner: "" },
//         description: "Initia Usernames",
//         token_id:
//           "user12345678testingpurposeswithaverylongnamethatfits64characters.init.1729011211",
//         uri: "https://usernames-api.initiation-2.initia.xyz/metadata/user12345678testingpurposeswithaverylongnamethatfits64characters",
//       },
//       object_addr:
//         "0xba9b53447057f78938654a3eb4bac7c93ba17327afdaca3ed49fefbd3deb5800",
//       owner_addr: "0x1dbbabcc3c918ba025a8d66a63f8f44524464820",
//     };

//     const address = initiaAddress!;
//     const recipientAddress = address;
//     const targetLayer = zaarChain as Chain;

//     const tx = new Tx({ address, layer, layer1, assets, assetsL1, modules });
//     const sendNFT = tx.sendNFT({ collectionAddress });
//     const params = { targetLayer, recipientAddress, tokens: [testToken] };
//     const messages = await sendNFT.getMessages(params);
//     console.log(messages); // Now, protobuf-formatted messages have been generated. Signing and broadcasting these messages will complete the token transfer.
//   }

//   return (
//     <div className=" h-screen w-screen overflow-x-hidden no-scrollbar relative flex flex-col items-center justify-start pb-10 ">
//       <div className="-mr-8">
//         <Header />
//       </div>
//       <StarField />
//       <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
//         <div className="w-full max-w-md p-6 space-y-4">
//           <h1 className="text-4xl font-bold text-center text-white mb-8">
//             Bridge NFTs to Zaar
//           </h1>
//           <input
//             type="text"
//             placeholder="Enter wallet address"
//             className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:border-white/30"
//           />
//           <button className="text-black flex flex-row items-center justify-center space-x-2 px-4 py-2 text-sm rounded-sm font-bold uppercase gradient-button transition duration-500 w-full"></button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NftBridge;

export default function NftBridge() {
  return <div>Nft Bridge Coming Soon...</div>;
}
