const convertToCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
  }).format(value);
};
const convertDate = (date) => {
  return new Date(date).toLocaleString("en-US", {
    timeZone: "EST",
  });
};
export { convertToCurrency, convertDate };
