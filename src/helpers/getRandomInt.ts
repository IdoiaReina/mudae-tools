/* getRandomInt helper function --------------------------------------------- */
export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max)
}

export const getRandomNegativeInt = () => {
  return -Math.floor(Math.random() * 1000)
}
