import Head from 'next/head';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { StarField } from '@/components/star-field';
import {Header} from '@/components/header';
export default function Profile() {
  const [activeTab, setActiveTab] = useState('ALL');
 

  return (
    <div className="no-scrollbar h-screen overflow-hidden">      
      <Header/>
      <StarField/>
      <div className="mt-[60px] container-fluid mx-auto py-6 pt-0">
        <div className="bg-transparent text-white min-h-screen">

        <div className="container mx-auto p-4">


      <main className="flex-grow flex flex-col items-center relative z-20">
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start mb-12">
          <div className="flex items-center mb-6 md:mb-0 md:mr-8">
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg mr-4">
              <Image
                src="/avatar.jpg"
                alt="User Avatar"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-light-green">JokerFrog</h1>
              <button className="btn btn-sm btn-outline bg-neutral-900 font-normal flex items-center mt-2">
                <svg width="50" height="50" viewBox="0 0 396 396" fill="none" className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M301.026 37.125H355.608L236.362 173.415L376.645 358.875H266.805L180.774 246.395L82.335 358.875H27.72L155.265 213.098L20.691 37.125H133.32L211.084 139.937L301.026 37.125ZM281.869 326.205H312.114L116.886 68.079H84.4305L281.869 326.205Z"></path>
                </svg>
                <span className="text-gray-light">@0xJokerFrog</span>
              </button>
            </div>
          </div>
          <div className="flex-grow w-full md:w-auto">
            <div className="bg-dark-gray rounded-sm p-6 shadow-xl">
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-6 text-center">
                <div className="border-r border-dark-gray-r pb-4 sm:pb-0 last:border-r-0">
                  <p className="text-gray text-sm mb-2">RANK</p>
                  <p className="text-light-green font-bold text-lg sm:text-2xl">#69</p>
                </div>
                <div className="border-r border-dark-gray-r pb-4 sm:pb-0 last:border-r-0">
                  <p className="text-gray text-sm mb-2">ROI</p>
                  <p className="text-light-green font-bold text-lg sm:text-2xl">145.28%</p>
                </div>
                <div className="border-r border-dark-gray-r pb-4 sm:pb-0 last:border-r-0">
                  <p className="text-gray text-sm mb-2">PROFIT</p>
                  <p className="text-light-green font-bold text-lg sm:text-2xl">$1,590</p>
                </div>
                <div>
                  <p className="text-gray text-sm mb-2">XP</p>
                  <div className="flex items-center justify-center">
                    <Image
                      src="/xp.png"
                      alt="XP Icon"
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    <p className="text-light-green font-bold text-lg sm:text-2xl">690</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-5xl mb-8 flex justify-center md:justify-start">
          <button className="bg-light-green text-black px-6 py-2 rounded-sm font-semibold">
            FLIPS 2
          </button>
        </div>

        <div className="w-full max-w-5xl mb-8">
          <div className="flex justify-center md:justify-start space-x-4">
            {['ALL', 'WON', 'LOST'].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-2 rounded-sm transition-colors ${
                  activeTab === tab ? 'bg-dark-gray text-light-green' : 'bg-black text-gray hover:bg-zinc-900'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full max-w-5xl bg-black border-dark-gray-all p-6 rounded-sm shadow-xl">
          {activeTab === 'ALL' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((box) => (
                <div key={box} className="border border-dark-gray-all rounded-sm p-4">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <Image
                        src="/avatar.jpg"
                        alt="JokerFrog"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="text-white font-bold">JokerFrog</p>
                      <p className="text-gray text-sm">@0xJokerFrog · 1 day ago</p>
                    </div>
                  </div>
                  <p className="text-light-green mb-2">Wager: $69</p>
                  <div className="flex justify-between mb-2 text-sm uppercase">
                    <p className="text-gray">Coins amount: 2</p>
                    <p className="text-gray">Min heads / tails: 1</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      <Image
                        src="/zaar-flip-heads.png"
                        alt="Coin"
                        width={24}
                        height={24}
                        className="mr-2"
                      />
                      <Image
                        src="/zaar-flip-tails.png"
                        alt="Coin"
                        width={24}
                        height={24}
                      />
                    </div>
                    <span className="text-lime-green border border-lime-green-all px-2 py-1 text-sm rounded-sm">
                      WON
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'WON' && <p>test</p>}
          {activeTab === 'LOST' && <p>test</p>}
        </div>
      </main>
    </div>
    </div>
    </div>
    </div>
  );
}