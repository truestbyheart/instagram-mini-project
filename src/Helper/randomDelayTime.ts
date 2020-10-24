const getRandomDelayTime = (delayTime: number[]) => {
  return delayTime[Math.floor(Math.random() * delayTime.length)];
};

const shortDelayTime: number[] = [
  7000,
  7100,
  7020,
  7003,
  7400,
  7050,
  7006,
  7700,
  7080,
  7090,
  8000,
  8123,
  8223,
  8323,
  8423,
  8523,
  8623,
  8723,
  8823,
  8923,
  9000,
  7500,
  7110,
  7221,
  7332,
  7443,
  7554,
  7665,
  7776,
  7887,
  7998,
  7009,
];

export { getRandomDelayTime, shortDelayTime };
