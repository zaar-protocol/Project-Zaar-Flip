import { Event } from "@prisma/client";
export type challenge = {
    id: number;
    title: string;
    description: string;
    reward: string;
    difficulty: string;
    steps: number;
    checkProgress: (events: Event[]) => number
}

export type userChallenge = {
    id: number;
    progress: number;
    //completed: boolean;
    //expiration: number;
}

