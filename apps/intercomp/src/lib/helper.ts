import { DateTime } from "luxon";

export const dateFormatTable = (date: string): string => {
  const [formatedDate, ..._] = date.split(" ");

  return DateTime.fromISO(formatedDate)
    .setLocale("en-US")
    .toFormat("dd LLL yyyy");
};
