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
