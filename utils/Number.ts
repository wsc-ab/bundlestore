const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const getUSDPrice = (number: number) => usd.format(number / 100);
