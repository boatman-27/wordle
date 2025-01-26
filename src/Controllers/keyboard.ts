export const handleKeyPress = (
  cb: (keyStroke: string) => void,
  event?: React.KeyboardEvent<HTMLDivElement>,
  letter?: string
): void => {
  if (event) {
    cb(event.key);
  }
  if (letter) {
    cb(letter);
  }
};
