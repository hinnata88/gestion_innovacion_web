import { DateTime } from 'luxon';

export const isDayShift = (date) => {
  const dateAbbreviation = DateTime.fromISO(date).toFormat('a');
  return dateAbbreviation === 'AM';
};
export const differenceByHours = (startTime, endTime) => {
  const diference = startTime.diff(endTime, 'hours');
  const hours = diference.toObject().hours || -1;
  return hours;
};
export const differenceByDays = (startTime, endTime) => {
  const diference = startTime.diff(endTime, 'days');
  const days = diference.toObject().days || -1;
  return days;
};
export const getNow = () => {
  const now = DateTime.utc();
  return now;
};
export const getNowString = () => {
  const now = DateTime.utc().toSQL({ includeOffset: false });
  return now;
};
export const getDateTime = (date) => {
  const nDate = DateTime.fromSQL(date);
  return nDate;
};
export const getDateTimeFromISO = (date) => {
  const nDate = DateTime.fromISO(date);
  return nDate;
};
export const getOnlyTimeAsString = (time) => {
  const timeObject = time.toISOTime({ includeOffset: false });
  return timeObject;
};
export const getOnlyDateAsString = (date) => {
  const nDate = date.toISODate();
  return nDate;
};
export const getDateAsString = (date) => {
  const nDate = date.toSQL();
  return nDate;
};
export const getTimeFromString = (time) => {
  const timeObject = DateTime.fromISO(time);
  return timeObject;
};
export const addDaysToDateTime = (date, amount) => {
  const dateObject = date.plus({ days: amount });
  return dateObject;
};
export const addHoursToDateTime = (date, amount) => {
  const dateObject = date.plus({ hours: amount });
  return dateObject;
};
export const addMinutesToDateTime = (date, amount) => {
  const dateObject = date.plus({ minutes: amount });
  return dateObject;
};
export const minusDaysToDateTime = (date, amount) => {
  const dateObject = date.minus({ days: amount });
  return dateObject;
};
export const minusHoursToDateTime = (date, amount) => {
  const dateObject = date.minus({ hours: amount });
  return dateObject;
};
export const isSaturday = (date) => {
  return date.weekday === 6;
};
export const isSunday = (date) => {
  return date.weekday === 7;
};
export const getWeekDayOfDateTime = (date) => {
  return date.weekday;
};
export const isWeekEnd = (date) => {
  return isSaturday(date) || isSunday(date);
};
