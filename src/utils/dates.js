const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

dayjs.extend(utc);

function formatDate(date) {
  return dayjs(date).format("YYYY-MM-DD_HH-mm-ss_SSS");
}

function decodeDate(fileName = "") {
  const [date, time] = fileName.split("_");
  const formattedDateTime = time.replace(/-/g, ':')

  return [date, formattedDateTime].join(" ");
}

module.exports = {
  formatDate,
  decodeDate,
};
