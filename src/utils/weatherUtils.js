export const convertToKmh = (speed) => {
  return (speed * 3.6).toFixed(1);
};

export const getWindDirection = (deg) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(deg / 45) % 8];
};

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getTimeZone = (s) => {
  const h = Math.round(s / 60 / 60);
  const utc = h === 0 ? "UTC" : h > 0 ? `UTC+${h}` : `UTC-${Math.abs(h)}`;
  const localTimestamp = Date.now() + s * 1000; //converts sec to milisec because Date.now() is in milisec.
  const localDate = new Date(localTimestamp);
  const hoursUtc = localDate.getUTCHours().toString().padStart(2, "0");
  const minutesUtc = localDate.getUTCMinutes().toString().padStart(2, "0");
  const localTime = `${hoursUtc}:${minutesUtc}`;
  const utcDay = localDate.getUTCDay(); //return 0-6 where 0 = Sunday
  const localDay = localDate.getUTCDate();
  const month = localDate.getUTCMonth();
  return {
    formattedDate: `${weekDays[utcDay]}, ${months[month]} ${localDay}`,
    utc: utc,
    localTime: localTime,
  };
};
