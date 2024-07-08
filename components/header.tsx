import Image from 'next/image';
import Link from 'next/link';
import {ConnectWallet} from '@/components/ConnectWallet';
export const Header = () =>{
    return(
        <header className="flex justify-between items-center w-screen  mb-0 relative z-20 px-2 py-2 pr-8">
        <Link 
          href="/"
          className="hover:cursor-pointer"
          >
        <Image
            src="/logo.png"
            alt="Zaar Flip Logo"
            width={105}
            height={40}
            className="text-white"
            />      
          </Link>  
        <div className="flex space-x-4">
          <ConnectWallet/>
        </div>
      </header>
    );
}
