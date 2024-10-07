import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = useRouter();

  useEffect(() => {
    if (
      pathname === "/challenges" ||
      pathname === "/" ||
      pathname === "/zaar-raffle"
    ) {
      document.body.style.overflowY = "visible";
    } else {
      document.body.style.overflowY = "hidden";
    }
  }, [pathname]);

  return (
    <div className="max-w-screen overflow-x-hidden no-scrollbar">
      {children}
      

    </div>
  );
}
