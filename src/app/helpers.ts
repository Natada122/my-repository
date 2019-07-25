export const sortByField = (nameField: string) => {
  return (a, b) => {
    if (a[nameField] < b[nameField]) {
      return 1;
    }
    if (a[nameField] > b[nameField]) {
      return -1;
    }
    return 0;
  };
};
