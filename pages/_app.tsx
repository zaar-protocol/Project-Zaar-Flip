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
import { BalanceContext } from "@/contexts/BalanceContext";
import { useBalance } from "wagmi";

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
            <BalanceWrapper>
              <WalletWidgetProvider
                chainId="zaar-testnet-3"
                filterWallet={(wallet) => {
                  return (
                    wallet.type !== "initia" &&
                    wallet.name !== "Keplr" &&
                    wallet.name !== "Ctrl" &&
                    wallet.name !== "Ledger" &&
                    wallet.name !== "Leap" &&
                    wallet.name !== "Ctrl Wallet" &&
                    wallet.name !== "Leap Wallet"
                  );
                }}
              >
                <Head>
                  <title>Zaar</title>
                  <link rel="icon" href="/favicon.ico" />
                </Head>
                <Component {...pageProps} />
              </WalletWidgetProvider>
            </BalanceWrapper>
          </QueryClientProvider>
        </WagmiProvider>
      </MuteProvider>
    </RootLayout>
  );
}

// Create a wrapper component that uses the balance hook
function BalanceWrapper({ children }: { children: React.ReactNode }) {
  const balance = useBalance();

  return (
    <BalanceContext.Provider value={{ refetchBalance: balance.refetch }}>
      {children}
    </BalanceContext.Provider>
  );
}

export default MyApp;
