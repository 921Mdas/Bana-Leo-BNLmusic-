export const resetStorage = (itemName, newData) => {
  if (localStorage.getItem(itemName)) {
    localStorage.removeItem(itemName);
  }
  localStorage.setItem(itemName, JSON.stringify(newData));
};
