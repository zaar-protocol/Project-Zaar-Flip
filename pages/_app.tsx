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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <MuteProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={client}>
            <WalletWidgetProvider chainId="zaar-testnet-3">
              <Head>
                <title>Zaar</title>
                <link rel="icon" href="/favicon.ico" />
              </Head>
              <Component {...pageProps} />
            </WalletWidgetProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </MuteProvider>
    </RootLayout>
  );
}

export default MyApp;
