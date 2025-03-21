export const dateToUint256Timestamp = (date: Date) => {
    // Get milliseconds since epoch and convert to seconds
    return BigInt(Math.floor(date.getTime() / 1000));
  }

export const getCurrentTimestamp = () => {
    return BigInt(Math.floor(Date.now() / 1000));
}

export const getFutureTimestamp = (minutesInFuture = 15) => {
    const secondsInFuture = minutesInFuture * 60;
    const currentTimestampSeconds = Math.floor(Date.now() / 1000);
    return BigInt(currentTimestampSeconds + secondsInFuture);
  }