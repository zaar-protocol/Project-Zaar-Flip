import  {useRef, useEffect, useState} from 'react';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
    <html lang="en">
      <body className="">
        <div className="max-w-screen overflow-x-hidden">
      
          {children}
        </div>
      </body>
    </html>
    </html>
  )
}
