export function formatDateIndonesia(dateString: string): string {
  const date = new Date(dateString);

  const formatted = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [day, month, year] = formatted.split(" ");

  return `${day}, ${month} ${year}`;
}

export function getDuration(startTime: string, endTime: string) {
  if (!startTime || !endTime) return 0;

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;

  const diff = end - start;

  return diff > 0 ? diff : 0;
}
