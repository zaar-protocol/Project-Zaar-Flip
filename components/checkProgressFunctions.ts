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

export const checkProgressFunctions: Record<
  ChallengeKey,
  (events: Event[]) => number
> = {
  "Seed to Whale": (events: Event[]) => {
    return 0;
  },
  "Lucky 7": (events: Event[]) => {
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
  "Whale’s Paradise": (events: Event[]) => {
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
      if (event.outcome && event.wager >= 1000) {
        sequenceLength++;
      } else {
        return sequenceLength;
      }
      if (sequenceLength == 5) {
        return 5;
      }
    }
    return 0;
  },
  "Make It All Back In One Trade": (events: Event[]) => {
    return 0;
  },
  "Speed Demon": (events: Event[]) => {
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
        (event.coins == 0 &&
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
  "Noob City": (events: Event[]) => {
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
        (event.coins == 0 &&
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
