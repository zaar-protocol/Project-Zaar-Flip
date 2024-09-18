import React, { useState, useEffect } from "react";

// Helper function to format numbers
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + "k";
  }
  return num.toString();
};

interface TicketSectionProps {
  title: string;
  value: string;
  button?: React.ReactNode;
  showProgress?: boolean;
  soldTickets?: number;
  totalTickets?: number;
}

const TicketSection: React.FC<TicketSectionProps> = ({
  title,
  value,
  button = null,
  showProgress = false,
  soldTickets = 0,
  totalTickets = 0,
}) => {
  const progressPercentage = (soldTickets / totalTickets) * 100;

  return (
    <div className="relative bg-[#6c9a19] p-4 rounded-sm flex-1 mr-0 md:mr-4 mb-0 md:mb-0 ticket">
      <div className="absolute left-0 top-1/2 w-4 h-4 bg-dark-gray rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute right-0 top-1/2 w-4 h-4 bg-dark-gray rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm mb-1 text-black font-bold">{title}</p>
          <p className="text-3xl font-bold text-dark-gray mb-2">{value}</p>
        </div>
        {button && <div className="ml-4">{button}</div>}
      </div>
      {showProgress && (
        <div className="relative w-full h-4 bg-dark-gray rounded-sm overflow-hidden shadow-inner mt-2">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r bg-lime-green rounded-sm transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <span className="text-xs font-bold text-light-green drop-shadow-md">
              {progressPercentage.toFixed(1)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

interface Ticket {
  id: number;
  number: string;
}

const TicketDisplay: React.FC<{ ticket: Ticket }> = ({ ticket }) => (
  <div className="bg-dark-gray p-2 rounded-sm flex items-center justify-between transition duration-300 ease-in-out transform hover:bg-zinc-700 border-dark-gray-all group">
    <div className="flex items-center space-x-1">
      <div className="w-0.5 h-6 bg-lime-green rounded-full"></div>
      <span className="text-xs lg:text-sm text-light-gray font-semibold tracking-wider group-hover:text-white transition-colors duration-300">
        {ticket.number}
      </span>
    </div>
    <span className="text-xxs lg:text-xs font-semibold text-gray group-hover:text-lime-green transition-colors duration-300">
      #{ticket.id.toString().padStart(3, "0")}
    </span>
  </div>
);

const DESKTOP_TICKETS_PER_PAGE = 36;
const MOBILE_TICKETS_PER_PAGE = 10;

const PurchaseModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm"></div>
      <div className="bg-dark-gray text-white p-6 rounded-sm max-w-md w-full relative z-10">
        <h2 className="text-2xl font-bold text-light-green mb-4">
          Purchase Tickets
        </h2>
        <p className="text-light-gray mb-4">
          Adjust the quantity of tickets you wish to purchase:
        </p>
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="range"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-full appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-zinc-700 [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:-mt-2 [&::-webkit-slider-thumb]:shadow-[0_0_10px_3px_rgba(255,255,255,0.3)] [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-zinc-700 [&::-moz-range-track]:h-1 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-[0_0_10px_3px_rgba(255,255,255,0.3)]"
          />
          <span className="text-2xl font-bold text-lime-green">{quantity}</span>
        </div>
        <p className="text-xl font-semibold mb-4">
          Total Cost:{" "}
          <span className="text-lime-green">{quantity * 100} INIT</span>
        </p>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray text-white font-bold py-2 px-4 rounded-sm transition duration-300 ease-in-out transform hover:scale-105"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Handle purchase logic here
              onClose();
            }}
            className="bg-lime-green text-black font-bold py-2 px-4 rounded-sm transition duration-300 ease-in-out transform hover:scale-105"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const RaffleDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState("MY TICKETS");
  const [currentPage, setCurrentPage] = useState(1);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const soldTickets = 40000;
  const totalTickets = 100000;

  useEffect(() => {
    const generatedTickets = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      number: (Math.floor(Math.random() * 1000000) + 1000000)
        .toString()
        .slice(1),
    }));
    setTickets(generatedTickets);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const ticketsPerPage = isMobile
    ? MOBILE_TICKETS_PER_PAGE
    : DESKTOP_TICKETS_PER_PAGE;

  const currentTickets = tickets.slice(
    (currentPage - 1) * ticketsPerPage,
    currentPage * ticketsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-dark-gray p-6 rounded-sm text-white shadow-lg">
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 uppercase">
        <TicketSection
          title="Ticket Cost:"
          value="100 INIT"
          button={
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-lime-green uppercase text-black font-bold px-4 py-2 text-sm rounded-sm transition duration-300 ease-in-out transform hover:scale-105"
            >
              Buy tickets
            </button>
          }
        />
        <TicketSection title="My Tickets:" value={tickets.length.toString()} />
        <TicketSection
          title="Tickets Sold:"
          value={`${formatNumber(soldTickets)} / ${formatNumber(totalTickets)}`}
          showProgress={true}
          soldTickets={soldTickets}
          totalTickets={totalTickets}
        />
      </div>
      <div className="flex mb-4 border-b border-zinc-700">
        <button
          className={`mr-8 pb-2 focus:outline-none ${
            activeTab === "MY TICKETS"
              ? "text-lime-green border-b-2 border-lime-green"
              : "text-lime-green hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("MY TICKETS")}
        >
          MY TICKETS
        </button>
        <button
          className={`pb-2 focus:outline-none ${
            activeTab === "RESULT"
              ? "text-lime-green border-b-2 border-green-500"
              : "text-gray hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("RESULT")}
        >
          RESULT
        </button>
      </div>
      <div className="bg-gray p-6 rounded-sm">
        {activeTab === "MY TICKETS" ? (
          tickets.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {currentTickets.map((ticket) => (
                  <TicketDisplay key={ticket.id} ticket={ticket} />
                ))}
              </div>
              <div className="mt-6 flex justify-center flex-wrap">
                {Array.from(
                  { length: Math.ceil(tickets.length / ticketsPerPage) },
                  (_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`mx-1 px-2 py-1 rounded-sm text-xs mb-2 ${
                        currentPage === i + 1
                          ? "bg-dark-gray text-light-green"
                          : "bg-transparent text-white"
                      } hover:bg-lime-green hover:text-dark-gray transition duration-300`}
                    >
                      {i + 1}
                    </button>
                  )
                )}
              </div>
            </>
          ) : (
            <p className="text-md uppercase text-light-green text-center">
              You have no tickets!
            </p>
          )
        ) : (
          <p className="text-md uppercase text-light-green text-center">
            Results will be announced after the raffle ends.
          </p>
        )}
      </div>
      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default RaffleDetails;
