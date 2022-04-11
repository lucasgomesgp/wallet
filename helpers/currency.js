export function formatMoney(money) {
  const formatter = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  return formatter.format(money);
}
