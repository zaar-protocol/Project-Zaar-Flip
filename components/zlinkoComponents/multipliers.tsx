export type Risk =
  | "Low"
  | "Medium"
  | "High"
  | "Degen"
  | "Extra Degen"
  | "Total Degen";

export const probabilities: number[][] = [
  [
    0.390625, 3.125, 10.9375, 21.875, 27.34375, 21.875, 10.9375, 3.125,
    0.390625,
  ],
  [
    0.1953125, 1.7578125, 7.03125, 16.40625, 24.609375, 24.609375, 16.40625,
    7.03125, 1.7578125, 0.1953125,
  ],
  [
    0.09765625, 0.9765625, 4.39453125, 11.71875, 20.5078125, 24.609375,
    20.5078125, 11.71875, 4.39453125, 0.9765625, 0.09765625,
  ],
  [
    0.048828125, 0.537109375, 2.685546875, 8.056640625, 16.11328125,
    22.55859375, 22.55859375, 16.11328125, 8.056640625, 2.685546875,
    0.537109375, 0.048828125,
  ],
  [
    0.0244140625, 0.29296875, 1.611328125, 5.37109375, 12.0849609375,
    19.3359375, 22.55859375, 19.3359375, 12.0849609375, 5.37109375, 1.611328125,
    0.29296875, 0.0244140625,
  ],
  [
    0.01220703125, 0.15869140625, 0.9521484375, 3.4912109375, 8.72802734375,
    15.71044921875, 20.947265625, 20.947265625, 15.71044921875, 8.72802734375,
    3.4912109375, 0.9521484375, 0.15869140625, 0.01220703125,
  ],
  [
    0.006103515625, 0.08544921875, 0.555419921875, 2.2216796875, 6.109619140625,
    12.21923828125, 18.328857421875, 20.947265625, 18.328857421875,
    12.21923828125, 6.109619140625, 2.2216796875, 0.555419921875, 0.08544921875,
    0.006103515625,
  ],
  [
    0.0030517578125, 0.0457763671875, 0.3204345703125, 1.3885498046875,
    4.1656494140625, 9.1644287109375, 15.2740478515625, 19.6380615234375,
    19.6380615234375, 15.2740478515625, 9.1644287109375, 4.1656494140625,
    1.3885498046875, 0.3204345703125, 0.0457763671875, 0.0030517578125,
  ],
  [
    0.00152587890625, 0.0244140625, 0.18310546875, 0.8544921875, 2.777099609375,
    6.6650390625, 12.21923828125, 17.4560546875, 19.6380615234375,
    17.4560546875, 12.21923828125, 6.6650390625, 2.777099609375, 0.8544921875,
    0.18310546875, 0.0244140625, 0.00152587890625,
  ],
];

export const storedMultipliers: Record<Risk, number[][]> = {
  Low: [
    [4.7, 2.3, 1.2, 1, 0.4],
    [3, 1.9, 1.7, 1.3, 0.5],
    [6.5, 2.9, 1.5, 1.3, 1, 0.3],
    [3.9, 3.4, 2.2, 1.2, 1, 0.7],
    [4.8, 3, 2.6, 1.9, 1.3, 0.6, 0.6],
    [6, 2.8, 2.3, 2.1, 2, 1, 0.3],
    [3.7, 2.9, 2.2, 1.8, 1.5, 1.2, 0.7, 0.7],
    [5, 3.5, 2.4, 1.8, 1.8, 1.8, 0.8, 0.5],
    [7.2, 4.1, 2.8, 2.1, 2, 1.5, 1.4, 0.6, 0.4],
  ],
  Medium: [
    [12, 2.8, 1.8, 0.6, 0.2],
    [14, 4.3, 2.7, 0.6, 0.4],
    [23, 4.7, 1.9, 1.1, 0.9, 0.2],
    [15, 7.5, 2.5, 2.1, 1, 0.2],
    [21, 11, 4.2, 2.8, 0.7, 0.6, 0.3],
    [27, 17, 5.4, 2.5, 1.4, 1, 0.2],
    [36, 20, 7.9, 2.6, 2.1, 1.2, 0.4, 0.2],
    [43, 32, 10, 3.3, 2.7, 2, 0.4, 0.2],
    [81, 34, 13, 4.7, 2.4, 2.3, 1.1, 0.3, 0.1],
  ],
  High: [
    [25, 6.7, 1.1, 0.2, 0.1],
    [45, 5.5, 1.7, 0.8, 0.2],
    [59, 19, 1.5, 0.7, 0.4, 0.1],
    [110, 22, 3.3, 0.9, 0.8, 0.1],
    [170, 29, 2.6, 2, 1, 0.4, 0.1],
    [280, 32, 8.1, 2, 1.7, 0.4, 0.2],
    [380, 67, 22, 5.1, 0.6, 0.4, 0.4, 0.1],
    [220, 180, 22, 5.1, 1.9, 1.2, 0.3, 0.1],
    [530, 220, 52, 8.5, 2.7, 1.3, 0.4, 0.2, 0.1],
  ],
  Degen: [[1000, 48, 1.2, 0.3, 0.2, 0.1, 0.1]],
  "Extra Degen": [[3333, 230, 0.9, 0.2, 0.2, 0.2, 0.1, 0.1]],
  "Total Degen": [[10000, 210, 21, 4.7, 1.9, 0.8, 0.3, 0.2, 0.1]],
};