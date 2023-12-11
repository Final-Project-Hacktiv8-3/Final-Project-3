export const formattedPrice = (value) => {
  return value.toLocaleString("en-US", {
    // style: "currency",
    // currency: "IDR",
  });
};
