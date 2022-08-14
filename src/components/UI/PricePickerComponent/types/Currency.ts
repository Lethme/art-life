enum Currency {
  Rubble = "Рубли",
  Dollar = "Доллары США",
  Euro = "Евро",
}

const currencySigns = {
  Rubble: "₽",
  Dollar: "$",
  Euro: "€",
};

export const getCurrencySign = (currency: Currency): string => {
  const currencyName = Object.entries(Currency).find(
    (entry) => entry[1] === currency
  )[0];

  return currencySigns[currencyName];
};

export default Currency;
