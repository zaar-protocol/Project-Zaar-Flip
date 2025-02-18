import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { WalletWidgetProvider } from "@initia/react-wallet-widget";
import { config } from "../config";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import type { Metadata } from "next";
import RootLayout from "./layout";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { ThirdwebProvider } from "thirdweb/react";
import { MuteProvider } from "./../components/MuteContext";
import { MuteButton } from "./../components/MuteButton";

export const metadata: Metadata = {
  title: {
    default: "Zaar",
    template: "%s | Zaar",
  },
  description: "Win big with Zaar - Crypto Coin Flip For The People",
  twitter: {
    card: "summary_large_image",
  },
};

const client = new QueryClient();

// createWeb3Modal({
//   wagmiConfig: config,
//   projectId: "07a5775d26541dd4c353432b24a75b30",
//   customWallets: [
//     {
//       id: "Initia",
//       name: "Initia Wallet",
//       homepage:
//         "https://chromewebstore.google.com/detail/initia-wallet/ffbceckpkpbcmgiaehlloocglmijnpmp?pli=1",
//       image_url: "/initia.png",
//     },
//   ],
//   featuredWalletIds: [
//     // "Initia",
//     "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0", //TrustWallet
//     "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369", //RainbowKit
//     "8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4",
//   ],
//   allWallets: "SHOW",
// });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <MuteProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={client}>
            <WalletWidgetProvider chainId="zaar-testnet-3">
              <ThirdwebProvider>
                <Head>
                  <title>Zaar</title>
                  <link rel="icon" href="/favicon.ico" />
                </Head>
                <Component {...pageProps} />
              </ThirdwebProvider>
            </WalletWidgetProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </MuteProvider>
    </RootLayout>
  );
}

export default MyApp;
