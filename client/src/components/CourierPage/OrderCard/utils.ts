export const formatDate = (date: string) => {
  return new Date(date).toLocaleString("he-IL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export const generateWazeUrl = (
  restaurantAddress: string | undefined,
  userAddress: string
) => {
  const restaurant = encodeURIComponent(restaurantAddress || "");
  const user = encodeURIComponent(userAddress || "");
  return `https://www.waze.com/ul?q=${restaurant}&via=${user}&navigate=yes`;
};
