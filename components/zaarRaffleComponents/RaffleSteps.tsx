import React, { useState } from "react";
import RaffleDetails from "./RaffleDetails";

const RaffleSteps = () => {
  const [activeTab, setActiveTab] = useState("MY TICKET");

  const steps = [
    {
      number: "1",
      title: "Buy Tickets",
      description: "Purchase your raffle tickets",
    },
    { number: "2", title: "Wait", description: "Wait for the raffle drawing" },
    {
      number: "3",
      title: "Check the chain",
      description: "View results and claim prizes",
    },
  ];

  return (
    <div className="bg-transparent p-6 rounded-sm text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray w-16 h-16 rounded-sm flex items-center justify-center mb-4 relative z-10">
                <span className="text-2xl font-bold">{step.number}</span>
              </div>
              <h3 className="text-lg text-light-green font-semibold mb-2 uppercase">
                {step.title}
              </h3>
              <p className="text-light-gray">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div
                className="hidden md:block absolute top-8 left-1/2 w-1/3 transform -translate-x-1/2"
                style={{ left: `${(index + 1) * 33.33}%` }}
              >
                <div className="w-full h-px bg-gray border-t border-dashed"></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RaffleSteps;
