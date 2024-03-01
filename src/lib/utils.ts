export const parseInput = (input: string): (number | null)[] => {
  const arr: any[] = input.split(",");
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    if (val.length == 0 || Number.isNaN(Number(val))) {
      arr[i] = null;
    } else {
      arr[i] = Number(val);
    }
  }
  return arr;
};

export const isValidInput = (input: string): boolean => {
  // remove extra space
  const trimmedInput = input.trim();

  // split the values
  const arr = trimmedInput.split(",");

  // root value must not be empty or null
  const rootVal = arr[0];
  if (rootVal.length == 0 || Number.isNaN(Number(arr[0]))) return false;

  return true;
};
