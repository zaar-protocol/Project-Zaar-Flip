"use client";

import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { context, loadScript } from "@initia/react-wallet-widget/ssr";
import type { WalletWidget, WidgetConfig } from "@initia/utils";

declare global {
  interface Window {
    createWalletWidget?: (config: WidgetConfig) => Promise<WalletWidget>;
  }
}

// You can specify the version of wallet-widget you want to use here.
// While you can use "latest", we recommend explicitly specifying the latest version number and updating it manually when needed for better stability.
// (You can check the latest available version here: https://www.npmjs.com/package/@initia/wallet-widget)
const VERSION = "1.5.4";

const WalletWidgetProvider = ({
  children,
  ...config
}: PropsWithChildren<WidgetConfig>) => {
  const [widget, setWidget] = useState<WalletWidget | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    async function setup() {
      // Instead of loading the script here, you can also simply load it at the bottom of the HTML body like this:
      // <script src="https://cdn.jsdelivr.net/npm/@initia/wallet-widget@1.1.0/dist/index.js" async />
      await loadScript(
        `https://cdn.jsdelivr.net/npm/@initia/wallet-widget@${VERSION}/dist/index.js`
      );
      const widget = await window.createWalletWidget!(config);
      setWidget(widget);
    }

    setup();
  }, [config]);

  if (!widget) return null;

  return <context.Provider value={widget}>{children}</context.Provider>;
};

export default WalletWidgetProvider;
