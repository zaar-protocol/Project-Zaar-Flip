import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import WalletWidgetProvider from "@/components/WalletWidgetProvider";
import { config, initia } from "@/config";
import Head from "next/head";
import type { Metadata } from "next";
import RootLayout from "./layout";
import { MuteProvider } from "./../components/MuteContext";
import { BalanceContext, BalanceProvider } from "@/contexts/BalanceContext";

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

const client = new QueryClient({
  defaultOptions: {
    queries: {
      experimental_prefetchInRender: true,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <MuteProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={client}>
            <BalanceProvider>
              <WalletWidgetProvider
                chainId={initia.name}
                filterWallet={(wallet) => {
                  return wallet.type === "evm";
                }}
              >
                <Head>
                  <title>Zaar</title>
                  <link rel="icon" href="/favicon.ico" />
                </Head>
                <Component {...pageProps} />
              </WalletWidgetProvider>
            </BalanceProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </MuteProvider>
    </RootLayout>
  );
}

export default MyApp;
