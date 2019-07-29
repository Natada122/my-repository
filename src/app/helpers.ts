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
export const generateId = () => {
 return `f${(~~(Math.random() * 1e8)).toString(16)}`;
};
