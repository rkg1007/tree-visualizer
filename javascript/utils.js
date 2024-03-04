export const parseInput = (input) => {
  const arr = input.split(",");
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    const trimmedVal = val.trim();
    if (trimmedVal.length == 0 || Number.isNaN(Number(trimmedVal))) {
      arr[i] = null;
    } else {
      arr[i] = Number(trimmedVal);
    }
  }
  return arr;
};

export const isValidInput = (input) => {
  // remove extra space
  const trimmedInput = input.trim();

  // split the values
  const arr = trimmedInput.split(",");

  // root value must not be empty or null
  const rootVal = arr[0];
  if (rootVal.length == 0 || Number.isNaN(Number(arr[0]))) return false;

  return true;
};
