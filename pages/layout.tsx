import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = useRouter();

  useEffect(() => {
    if (pathname === "/challenges") {
      document.body.style.overflowY = "visible";
    } else {
      document.body.style.overflowY = "hidden";
    }
  }, [pathname]);

  return (
    <html lang="en">
      <html lang="en">
        <body className="">
          <div className="max-w-screen overflow-x-hidden no-scrollbar">
            {children}
          </div>
        </body>
      </html>
    </html>
  );
}
