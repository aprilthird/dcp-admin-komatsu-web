export function setFormatDate(date: Date): string {
  const currentMonth = Number(date.getMonth()) + 1;
  return (
    date.getFullYear() +
    "-" +
    addZero(currentMonth) +
    "-" +
    addZero(date.getUTCDate())
  );
}

function addZero(value): string {
  if (value < 10) return "0" + value;
  return value;
}
