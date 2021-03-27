import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";

dayjs.extend(calendar);

export function getTime(createdAt) {
  return dayjs(createdAt).calendar();
}

export function getShortenedTime(createdAt) {
  return dayjs(createdAt).format("h:mm A");
}

export function getTimeDifference(date1, date2) {
  return dayjs(date1).diff(dayjs(date2), "minutes");
}

export function checkNewDay(date1, date2) {
  return !dayjs(date1).isSame(dayjs(date2), "day");
}

export function formatDivider(date) {
  return dayjs(date).format("MMMM D, YYYY");
}
