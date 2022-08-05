import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";

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

export const Load = (type, color) => {
  return (
    <div className="spinner">
      <Spinner animation={type} variant={color} size="lg" />
    </div>
  );
};
