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
