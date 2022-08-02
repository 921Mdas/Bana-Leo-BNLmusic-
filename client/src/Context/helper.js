import { toast } from "react-toastify";

export const resetStorage = (itemName, newData) => {
  if (localStorage.getItem(itemName)) {
    localStorage.removeItem(itemName);
  }
  localStorage.setItem(itemName, JSON.stringify(newData));
};

export const setStorage = itemName => {
  const isInLocalStorage = localStorage.getItem(itemName)
    ? JSON.parse(localStorage.getItem(itemName))
    : null;

  return isInLocalStorage;
};

export const Toaster = (type, message) => {
  toast[type](message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 500,
  });
};
