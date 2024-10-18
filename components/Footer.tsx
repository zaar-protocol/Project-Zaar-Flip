import Link from "next/link";
import { Tooltip } from "./tooltip";

export const Footer = () => {
  return (
    <div className="mt-4 h-6 w-full bg-transparent bg-opacity-50 flex flex-row gap-2 items-center justify-center">
      <div className="text-center text-gray transistion duration-500 ease-in-out">
        This game is provably fair.
      </div>
      <Link
        href="https://gitbook.zaar.market/"
        className="hover:text-white transition duration-300 ease-in-out"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="z-30 w-4 h-4 fill-current text-yellow-400 hover:text-white transition duration-300 ease-in-out"
        >
          <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" />
        </svg>
      </Link>
    </div>
  );
};

export default Footer;
