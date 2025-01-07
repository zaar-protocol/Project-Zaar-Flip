import Image from "next/image";
export const EventBox = ({
  userName,
  date,
  profPicUrl,
  wager,
  outcome,
  winnings,
}: {
  userName: string;
  date: number;
  profPicUrl: string;
  wager: number;
  outcome: boolean;
  winnings: number;
}) => {
  console.log(date);
  const d = new Date(date);
  const today = new Date();
  const timeAgo = Math.floor(
    (today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
  );
  return (
    <div className="border border-dark-gray-all rounded-sm p-4">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          <Image
            src={profPicUrl || "/profile.jpg"}
            alt="JokerFrog"
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <p className="text-white font-bold">{userName}</p>
          <p className="text-gray text-sm">{timeAgo} days ago</p>
        </div>
      </div>
      <div className="flex justify-between mb-2 text-sm uppercase">
        <p className="text-light-green mb-2">Wager: ${wager}</p>
        <p className="text-light-green mb-2">
          Winnings: <span className="text-lime-green">{winnings}</span>
        </p>
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
          <Image src="/zaar-flip-tails.png" alt="Coin" width={24} height={24} />
        </div>
        <span className="text-lime-green border border-lime-green-all px-2 py-1 text-sm rounded-sm">
          {outcome ? "WON" : "LOST"}
        </span>
      </div>
    </div>
  );
};
