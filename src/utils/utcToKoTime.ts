import { toZonedTime } from "date-fns-tz";

export function utcToKoTime(utcTime: string | Date) {
  const timeZone = "Asia/Seoul";

  const zonedDate = toZonedTime(utcTime, timeZone);
  return zonedDate;
}
