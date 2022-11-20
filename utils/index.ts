type TruncateStringProps = {
  fullString: string;
  desiredLength?: number;
};

export function truncateMiddleOfString({
  fullString,
  desiredLength = 15,
}: TruncateStringProps) {
  if (fullString.length <= desiredLength) return fullString;

  const separator = '...';
  const seperatorLength = separator.length;
  const charsToShow = desiredLength - seperatorLength;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  return (
    fullString.substring(0, frontChars) +
    separator +
    fullString.substring(fullString.length - backChars)
  );
}

export const isInvalidAddress = (address: string) =>
  address?.includes('0x000000000');

export const bigNumberToLocaleDateString = (date: number) => {
  const localeDate = new Date(date).toLocaleDateString('pt-BR');

  return date === 0 ? 'Data indefinida' : localeDate;
};
