export function formatLocalDateTime(dateStr: string): string {
  if (!dateStr) return "";

  // Remove microssegundos extras (Java envia até 6 dígitos)
  const normalized = dateStr.replace(/(\.\d{3})\d+$/, "$1");

  const date = new Date(normalized);

  if (isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}