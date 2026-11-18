// A value is "real" when it is non-empty and not a TODO / blank-underscore placeholder.
export const isReal = (v) =>
  typeof v === "string" && v.trim() !== "" && !/^\s*TODO/i.test(v) && !v.includes("____");

export const realList = (arr = []) => arr.filter(isReal);

const MONTHS = { JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5, JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11 };
export const mainDateObj = ({ day, month, year }) => new Date(Number(year), MONTHS[month.toUpperCase()], Number(day), 0, 0, 0);
