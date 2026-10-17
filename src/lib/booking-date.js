/**
 * Normalises a picked date to an ISO string for the API. Accepts a native
 * `<input type="date">` string, a Date, or a `{year, month, day}` calendar object.
 */
export function toBookingDateISO(dateValue) {
  if (!dateValue) return null;

  if (dateValue instanceof Date && !Number.isNaN(dateValue.getTime())) {
    return dateValue.toISOString();
  }

  if (typeof dateValue === "object" && "year" in dateValue) {
    const { year, month, day } = dateValue;
    return new Date(year, month - 1, day).toISOString();
  }

  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return null;

  return parsed.toISOString();
}
