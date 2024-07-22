import { useState } from "react";
export const Tooltip = ({text}:{text: string}) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [tooltipOpenHard, setTooltipOpenHard] = useState(false);

    return(
        <span className="ml-2 relative group">
                <button onClick={()=>{setTooltipOpenHard(!tooltipOpenHard)}} onMouseLeave={()=>{setTooltipOpen(false);}} onMouseEnter={()=>{setTooltipOpen(true);}}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current text-yellow-400">
                    <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"/>
                  </svg>
                </button>
                <div className={`absolute bottom-6 left-9 transform -translate-x-1/2 bg-gray text-light-green text-sm rounded py-2 px-3  ${tooltipOpen|| tooltipOpenHard? "opacity-100" : " hidden "} transition-opacity duration-300 w-72 text-left`}>
                  <div className="relative w-full h-full">
                    <div onClick={()=>{setTooltipOpenHard(false);}} className="absolute top-0 right-0 w-4 h-4 bg-gray hover:cursor-pointer font-bold flex items-start ml-2 justify-end">X</div>
                    <p>{text}</p>
                  </div>
                </div>
              </span>

    );
}