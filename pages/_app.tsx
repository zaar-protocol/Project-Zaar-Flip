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
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#e3bf00",
            accentColorForeground: "black",
            overlayBlur: "small",
          })}
        >
          <WalletWidgetProvider chainId="2594729740794688">
            <Head>
              <title>Zaar</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
          </WalletWidgetProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
