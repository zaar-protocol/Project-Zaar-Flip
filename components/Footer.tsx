import Link from 'next/link';
export const Footer = () => {   
    return(
    <div className="mt-4 h-6 w-full bg-transparent bg-opacity-50 flex flex-row items-center justify-center">
        <Link className="text-center text-white hover:-translate-y-2 hover:text-white transistion duration-500 ease-in-out" href="https://gitbook.zaar.market/">This game is provably fair</Link>
      </div>);
    }
export default Footer;