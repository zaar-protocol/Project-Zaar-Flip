import { checkProgressFunctions } from "./checkProgressFunctions"
import type { challenge } from "@/types/challenge"

export const dailyChallenges: challenge[] = [
    {
      id: 1,
      title: "Seed to Whale",
      description:
        "Achieve 2,000x account growth starting from a minimum $1 bet",
      reward: "100,000 XP",
      difficulty: "Hard",
      steps: 1,
      checkProgress: checkProgressFunctions["Seed to Whale"],
    },
    {
      id: 2,
      title: "Lucky 7",
      description:
        "Win 7 consecutive coin flips with a minimum $1 bet each flip",
      reward: "100,000 XP",
      difficulty: "Hard",
      steps: 7,
      checkProgress: checkProgressFunctions["Lucky 7"],
    },
    {
      id: 3,
      title: "Whale’s Paradise",
      description:
        "Win 5 consecutive coin flips with a minimum $1,000 bet each",
      reward: "100,000 XP",
      difficulty: "Expert",
      steps: 5,
      checkProgress: checkProgressFunctions["Whale’s Paradise"],
    },
    {
      id: 4,
      title: "Make It All Back In One Trade",
      description:
        "Recover from a 90% account loss to double your initial balance, minimum $500 within 24 hours",
      reward: "100,000 XP",
      difficulty: "Medium",
      steps: 1,
      checkProgress: checkProgressFunctions["Make It All Back In One Trade"],
    },
    {
      id: 5,
      title: "Speed Demon",
      description:
        "Complete 1,000 coin flips within 1 hour (minimum $100 bet each)",
      reward: "100,000 XP",
      difficulty: "Expert",
      steps: 5,
      checkProgress: checkProgressFunctions["Speed Demon"],
    },
    {
      id: 6,
      title: "Noob City",
      description:
        "Complete 500 coin flips within 1 hour (minimum $50 bet each)",
      reward: "100,000 XP",
      difficulty: "Easy",
      steps: 5,
      checkProgress: checkProgressFunctions["Noob City"],
    },
]