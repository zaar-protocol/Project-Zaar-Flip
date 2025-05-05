import { useState } from 'react';
import { useStakingBalance } from '@/hooks/useStakingBalance';
import { parseEther } from 'viem';
import { useAccount } from 'wagmi';
import LoadingModal from './loadingModal';

export function DepositButton() {
  const [amount, setAmount] = useState('');
  const { address } = useAccount();
  const { 
    requestStake, 
    isStaking, 
    stakeError, 
    isTxSuccess, 
    isTxError,
    allowance,
    approveStaking
  } = useStakingBalance(address || '');

  const handleDeposit = () => {
    if (!amount) return;
    const amountBigInt = parseEther(amount);
    if (allowance < amountBigInt) {
      approveStaking(amountBigInt);
    } else {
      requestStake(amountBigInt);
    }
  };

  const handleCloseModal = () => {
    // Modal will close automatically when isStaking becomes false
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount to stake"
          className="p-2 border rounded"
        />
        <button
          onClick={handleDeposit}
          disabled={!amount || isStaking}
          className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
        >
          {isStaking ? 'Processing...' : 'Deposit'}
        </button>
      </div>

      <LoadingModal 
        isOpen={isStaking} 
        onClose={handleCloseModal}
      />
    </>
  );
} 