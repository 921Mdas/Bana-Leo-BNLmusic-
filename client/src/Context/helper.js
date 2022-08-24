import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// reset item data on local storage
export const resetStorage = (itemName, newData) => {
  if (localStorage.getItem(itemName)) {
    localStorage.removeItem(itemName);
  }
  localStorage.setItem(itemName, JSON.stringify(newData));
};
// get new item on local storage
export const getStorage = itemName => {
  const isInLocalStorage = localStorage.getItem(itemName)
    ? JSON.parse(localStorage.getItem(itemName))
    : null;

  return isInLocalStorage;
};

export const setStorage = (itemName, item) => {
  const setInLocalStorage = item
    ? localStorage.setItem(itemName, JSON.stringify(item))
    : null;

  return setInLocalStorage;
};
// logout

export const LogOut = dataType => {
  localStorage.removeItem(dataType);
  localStorage.clear();
};
// create toaster - !problematic to be reviewed
export const ToasterError = message => {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 500,
  });
};
export const ToasterSuccess = message => {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 500,
  });
};

// loading spinner
export const Load = (type, color) => {
  return (
    <div className="spinner">
      <Spinner animation={type} variant={color} size="lg" />
    </div>
  );
};
// navigate to a specific directions
export const NavigateSomewhere = direction => {
  const navigate = useNavigate();

  return direction => {
    navigate(direction);
  };
};
// user authentication
export const UserAuthentication = async (url, currentUser) => {
  try {
    const loggedUser = await axios.post(url, currentUser);
    return loggedUser;
  } catch (error) {
    if (error) ToasterError(error.response.data);
    console.log(error);
  }
};

// email and password regex
export const EmailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  "g"
);
export const PasswordRegex = new RegExp(/[0-9]/, "g");
