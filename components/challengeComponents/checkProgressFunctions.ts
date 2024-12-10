import { Event } from "@prisma/client";

export const challengeKeys = [
  "Seed to Whale",
  "Lucky 7",
  "Whale’s Paradise",
  "Make It All Back In One Trade",
  "Speed Demon",
  "Noob City",
] as const;
export type ChallengeKey = (typeof challengeKeys)[number];

export type CheckProgressFunction = (events: Event[], startingBalance: number) => number;

export const checkProgressFunctions: Record<ChallengeKey, CheckProgressFunction> = {
  "Seed to Whale": (events: Event[], startingBalance: number) => {
    if(events.length === 0){
      return 0;
    }
    if(startingBalance >= 1){
      events.forEach((event) => {
        event.createdAt = new Date(event.createdAt); // Convert to Date object
      });
  
      // Sort events by createdAt in ascending order
      events.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  
      let balance = startingBalance;
      for(const event of events){
        if(!event.outcome) {
          balance = balance - event.wager
        } else {
          balance = balance + event.winnings
        }
        if((balance-startingBalance)/startingBalance >= 2000){
          return 1;
        }
      }
      console.log("Balance: ********************")
      console.log(balance)
    }
    
    return 0;
  },
  "Lucky 7": (events: Event[], startingBalance: number) => {
    if(events.length === 0){
      return 0;
    }
    events.forEach((event) => {
      event.createdAt = new Date(event.createdAt); // Convert to Date object
    });

    // Sort events by createdAt in descending order
    events.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    if (!events[0].outcome) {
      return 0;
    }
    let sequenceLength = 0;
    for (const event of events) {
      if (event.outcome && event.wager >= 1) {
        sequenceLength++;
      } else {
        return sequenceLength;
      }
      if (sequenceLength == 7) {
        return 7;
      }
    }
    return 0;
  },
  "Whale’s Paradise": (events: Event[], startingBalance: number) => {
    if(events.length === 0){
      return 0;
    }
    events.forEach((event) => {
      event.createdAt = new Date(event.createdAt); // Convert to Date object
    });

    // Sort events by createdAt in descending order
    events.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    if (!events[0].outcome) {
      return 0;
    }

    let sequenceLength = 0;
    for (const event of events) {
      console.log(event)
      if (event.outcome && event.wager >= 1000) {
        sequenceLength++;
      } else {
        return sequenceLength;
      }
      if (sequenceLength == 5) {
        return 5;
      }
    }
    if (sequenceLength > 0){
      return sequenceLength;
    }
    return 0;
  },
  "Make It All Back In One Trade": (events: Event[], startingBalance: number) => {
    if(events.length === 0){
      return 0;
    }
    if(startingBalance >= 500){
      events.forEach((event) => {
        event.createdAt = new Date(event.createdAt); // Convert to Date object
      });
  
      // Sort events by createdAt in ascending order
      events.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  
      let balance = startingBalance;
      const min = startingBalance * .1;
      let minReached = false;
      for(const event of events){
        if(!event.outcome) {
          balance = balance - event.wager
        } else {
          balance = balance + event.winnings
        }
        
        if(minReached){
          if(balance >= (2 * startingBalance)) {
            return 1;
          }
        } else {
          if(balance <= min){
            console.log("Event and balance when min is hit: ")
            console.log(event)
            console.log(balance)
            minReached = true;
          }
        }
      }
      console.log(balance)
    }
    return 0;
  },
  "Speed Demon": (events: Event[], startingBalance: number) => {
    if(events.length === 0){
      return 0;
    }
    events.forEach((event) => {
      event.createdAt = new Date(event.createdAt); // Convert to Date object
    });

    // Sort events by createdAt in descending order
    events.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    let total = 0;
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    for (const event of events) {
      if (
        total == 1000 ||
        event.createdAt <= oneHourAgo ||
        (event.gameType === "Flip" &&
          event.wager == 0 &&
          event.winnings == 0 &&
          !event.outcome)
      ) {
        console.log(event);
        break;
      }
      if (event.wager >= 100) {
        total++;
      }
    }
    console.log(total);
    return Math.min(Math.floor(total / 200), 5);
  },
  "Noob City": (events: Event[], startingBalance: number) => {
    events.forEach((event) => {
      event.createdAt = new Date(event.createdAt); // Convert to Date object
    });

    // Sort events by createdAt in descending order
    events.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    let total = 0;
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    for (const event of events) {
      if (
        total == 500 ||
        event.createdAt <= oneHourAgo ||
        (event.gameType === "Flip" &&
          event.wager == 0 &&
          event.winnings == 0 &&
          !event.outcome)
      ) {
        console.log(event);
        break;
      }
      if (event.wager >= 50) {
        total++;
      }
    }
    console.log(total);
    return Math.min(Math.floor(total / 10), 5);
  },
};
