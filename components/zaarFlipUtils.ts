export type WinChanceType = {
  toWin: number;
  chance: number;
};
export function getLayoutClass(amount:number) {
    const layouts: { [key: number]: string } = {
      1: 'flex justify-center',
      2: 'flex justify-center space-x-2',
      3: 'flex justify-center space-x-2',
      4: 'grid grid-cols-2 gap-2',
      5: 'grid grid-cols-3 gap-2',
      6: 'grid grid-cols-3 gap-2',
      7: 'grid grid-cols-4 gap-2',
      8: 'grid grid-cols-4 gap-2',
      9: 'grid grid-cols-5 gap-2',
      10: 'grid grid-cols-5 gap-2'
    };
    return layouts[amount];
  }
  
  export function getCoinSize(amount:number) {
    return amount <= 3 ? 'w-20 h-20' : 'w-16 h-16';
  }

  export function getCoinImageClass(isHeads: boolean): string {
    return isHeads ? 'coin-heads' : 'coin-tails';
  }
  
  export function updateCoinsDisplay(coinsDisplay: HTMLElement, coinsAmount: number, minHeadsTails: number, currentSide: string): void {
    const existingCoins: NodeListOf<HTMLDivElement> = coinsDisplay.querySelectorAll('.coin-wrapper');
    const newLayout: string = getLayoutClass(coinsAmount);

    // Determine the size based on the number of coins
    const size: string = coinsAmount <= 3 ? 'w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40' : 'w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28';

    const isHeads = currentSide === 'heads';

    // Update existing coins
    existingCoins.forEach((wrapper: HTMLDivElement, index: number) => {
      const coin = wrapper.querySelector('.coin')!;
      const heads = coin.querySelector('.coin-heads')!;
      const tails = coin.querySelector('.coin-tails')!;

      if (index < coinsAmount) {
        // const coinImageClass = index < minHeadsTails ? getCoinImageClass(isHeads) : getCoinImageClass(!isHeads);
        heads.className = `coin-heads ${size}`;
        tails.className = `coin-tails ${size}`;
        coin.className = `coin ${size} bg-contain bg-center bg-no-repeat transition-all duration-300 ease-in-out m-1 ${
          currentSide === 'heads' 
            ? index < minHeadsTails ? "flip-once" : "" 
            : index < minHeadsTails ? "" : "flip-once"
        }`;
        wrapper.className=`coin-wrapper ${size}`
      } else {
        coin.classList.add('coin-exit');
        wrapper.remove();
        //setTimeout(() => coin.remove(), 300);
      }
    });

    // Add new coins
    for (let i = existingCoins.length; i < coinsAmount; i++) {
      const wrapper: HTMLDivElement = document.createElement('div');
      const coin: HTMLDivElement = document.createElement('div');
      const heads: HTMLDivElement = document.createElement('div');
      const tails: HTMLDivElement = document.createElement('div');
      
      // const coinImageClass = i < minHeadsTails ? getCoinImageClass(isHeads) : getCoinImageClass(!isHeads);

      wrapper.className = `coin-wrapper ${size}`;
      coin.className = `coin ${size} bg-contain bg-center bg-no-repeat transition-all duration-300 ease-in-out m-1 coin-enter ${
        currentSide === 'heads' 
          ? i < minHeadsTails ? "flip-once" : "" 
          : i < minHeadsTails ? "" : "flip-once"
      }`;
      heads.className = `coin-heads ${size}`;
      tails.className = `coin-tails ${size}`;

      if (i === 1) {
        coin.classList.add('coin-enter-1');
      } else if (i >= 2) {
        coin.classList.add('coin-enter-2');
      }

      coin.appendChild(heads);
      coin.appendChild(tails);
      wrapper.appendChild(coin);
      coinsDisplay.appendChild(wrapper);

      setTimeout(() => {
        coin.classList.remove('coin-enter-1', 'coin-enter-2', 'coin-enter');
      }, 50);
    }

    coinsDisplay.className = `flex flex-wrap justify-center items-center mb-2 transition-all duration-500 ease-in-out coin-display ${newLayout}`;
  }
  
  export function flipCoins(coinsDisplay: HTMLElement, minHeadsTails: number, currentSide: string): void {
    const coins: NodeListOf<HTMLDivElement> = coinsDisplay.querySelectorAll('.coin');
    const isHeads = currentSide === 'heads';

    coins.forEach((coin: HTMLDivElement, index: number) => {
      if(coin.classList.contains('flip-once')){
        coin.classList.remove('flip-once')
      } else {
        coin.classList.add('flip-once')
      }
    });
  }

  export function startFlipping(coinsDisplay: HTMLElement): void {
    const wrappers: NodeListOf<HTMLDivElement> = coinsDisplay.querySelectorAll('.coin-wrapper');
    wrappers.forEach((wrapper: HTMLDivElement, index: number) => {
      setTimeout(() => {
        const coin = wrapper.querySelector('.coin')!;
        wrapper.classList.add('coin-translate');
        coin.classList.add('coin-rotate');
      }, 0)

    });
  }

  export function stopFlipping(coinsDisplay: HTMLElement): void {
    const wrappers: NodeListOf<HTMLDivElement> = coinsDisplay.querySelectorAll('.coin-wrapper');
    wrappers.forEach((wrapper: HTMLDivElement, index: number) => {
      const coin = wrapper.querySelector('.coin')!;
      coin.classList.remove('coin-rotate');
      wrapper.classList.remove('coin-translate');
    });
  }

  export function randomFlip(coinsDisplay: HTMLElement, minHeadsTails: number, currentSide: string, outcome: boolean): void {
    const wrappers: NodeListOf<HTMLDivElement> = coinsDisplay.querySelectorAll('.coin-wrapper');
    const totalCoins = wrappers.length;
    const isHeads = currentSide === 'heads';
    
    // Step 2: Determine how many coins need to land on the currentSide
    let numCurrentSide = minHeadsTails;
    if (!outcome) {
        numCurrentSide = Math.floor(Math.random() * minHeadsTails);
    } else {
        numCurrentSide = Math.floor(Math.random() * (totalCoins - minHeadsTails + 1)) + minHeadsTails;
    }
    
    // Step 3: Randomly select the required number of coins to land on the currentSide
    const selectedCoins: Set<number> = new Set();
    while (selectedCoins.size < numCurrentSide) {
        const randomIndex = Math.floor(Math.random() * totalCoins);
        selectedCoins.add(randomIndex);
    }
    
    // Step 4: Shuffle coins (already shuffled due to random selection)
    // Step 5: Update coin display based on the outcome
    wrappers.forEach((wrapper, index) => {
      setTimeout(() => {
        const coin = wrapper.querySelector('.coin')!;
        if(selectedCoins.has(index)){
          if(currentSide === "tails"){
            if(coin.classList.contains('flip-once')){
              coin.classList.remove('flip-once')
            }
          } else {
            if(!coin.classList.contains('flip-once')){
              coin.classList.add('flip-once')
            }
          }
        } else {
          if(currentSide === "tails"){
            if(!coin.classList.contains('flip-once')){
              coin.classList.add('flip-once')
            }
          } else {
            if(coin.classList.contains('flip-once')){
              coin.classList.remove('flip-once')
            }
          }
        }
        // const coinImageClass = selectedCoins.has(index) ? getCoinImageClass(isHeads) : getCoinImageClass(!isHeads);
        // coin.classList.remove('coin-heads', 'coin-tails');
        // coin.classList.add(coinImageClass);
        wrapper.classList.add("coin-translate");
        coin.classList.add("coin-rotate");
        setTimeout(() => {
          wrapper.classList.remove("coin-translate")
          coin.classList.remove("coin-rotate")
          coin.classList.add("coin-land")
          setTimeout(() => {
            coin.classList.remove("coin-land")
          }, 1000)
        }, 1100)
      }, 200*index)
    });
  }
  
  export function updateWinChance(coinsAmount:number, minHeadsTails:number) {
    const combinations = calculateCombinations(coinsAmount, minHeadsTails);
    const totalCombinations = Math.pow(2, coinsAmount);
    const chance = (combinations / totalCombinations) * 100;
    let chances: WinChanceType = { toWin: minHeadsTails, chance: Number(chance.toFixed(2)) };
    return chances;
  }
  
  export function updatePotentialWin(coinsAmount:number, minHeadsTails:number, wager:number) {
    const favorableOutcomes = calculateCombinations(coinsAmount, minHeadsTails);
    const odds = Math.pow(2, coinsAmount) / favorableOutcomes;
    const grossPayout = Math.trunc(wager * odds);

    const fee = Math.floor(grossPayout * 0.04);

    return (grossPayout - fee).toFixed(2);
  }
  
  export function calculateCombinations(n:number, k:number) {
    let result = 0;
    for (let i = k; i <= n; i++) {
      result += binomialCoefficient(n, i);
    }
    return result;
  }
  
  function binomialCoefficient(n:number, k:number) {
    let result:number = 1;
    if (k === 0 || k === n) return result;
    else{
      result = Number(binomialCoefficient(n - 1, k - 1) + binomialCoefficient(n - 1, k));
    }
    return result;
  }

  