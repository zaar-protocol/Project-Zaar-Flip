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
  
  export function getHeadsImage(currentSide:string) {
    return currentSide === 'heads' ? "url('/zaar-flip-heads.png')" : "url('/zaar-flip-tails.png')";
  }
  
  export function getTailsImage(currentSide:string) {
    return currentSide === 'heads' ? "url('/zaar-flip-tails.png')" : "url('/zaar-flip-heads.png')";
  }
  
  export function updateCoinsDisplay(coinsDisplay: HTMLElement, coinsAmount: number, minHeadsTails: number, currentSide: string): void {
    const existingCoins: NodeListOf<HTMLDivElement> = coinsDisplay.querySelectorAll('.coin');
    const newLayout: string = getLayoutClass(coinsAmount);

    // Determine the size based on the number of coins
    const size: string = coinsAmount <= 3 ? 'w-36 h-36 md:w-40 md:h-40' : 'w-24 h-24 md:w-28 md:h-28';

    // Update existing coins
    existingCoins.forEach((coin: HTMLDivElement, index: number) => {
      if (index < coinsAmount) {
        coin.className = `coin ${size} bg-contain bg-center bg-no-repeat transition-all duration-300 ease-in-out m-1`;
        coin.style.backgroundImage = index < minHeadsTails ? getHeadsImage(currentSide) : getTailsImage(currentSide);
      } else {
        coin.classList.add('coin-exit');
        coin.remove();
        //setTimeout(() => coin.remove(), 300);
      }
    });

    // Add new coins
    for (let i = existingCoins.length; i < coinsAmount; i++) {
      const coin: HTMLDivElement = document.createElement('div');
      coin.className = `coin ${size} bg-contain bg-center bg-no-repeat transition-all duration-300 ease-in-out m-1 coin-enter`;
      coin.style.backgroundImage = i < minHeadsTails ? getHeadsImage(currentSide) : getTailsImage(currentSide);

      if (i === 1) {
        coin.style.transform = 'translateX(-100%)';
      } else if (i >= 2) {
        coin.style.transform = 'translate(-100%, -100%)';
      }

      coinsDisplay.appendChild(coin);

      setTimeout(() => {
        coin.style.transform = 'translate(0, 0)';
        coin.classList.remove('coin-enter');
      }, 50);
    }

    coinsDisplay.className = `flex flex-wrap justify-center items-center mb-2 transition-all duration-500 ease-in-out ${newLayout}`;
  }
  
  export function flipCoins(coinsDisplay: HTMLElement, minHeadsTails: number, currentSide: string): void {
    const coins: NodeListOf<HTMLDivElement> = coinsDisplay.querySelectorAll('.coin');
    coins.forEach((coin: HTMLDivElement, index: number) => {
      coin.classList.add('coin-flip');
      setTimeout(() => {
        coin.style.backgroundImage = index < minHeadsTails ? getHeadsImage(currentSide) : getTailsImage(currentSide);
        coin.classList.remove('coin-flip');
      }, 250);
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
    const combinations = calculateCombinations(coinsAmount, minHeadsTails);
    const probability = combinations / Math.pow(2, coinsAmount);
    const multiplier = 0.98 / probability;
    return (wager * multiplier).toFixed(2);
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

  