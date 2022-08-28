// External imports
import { FcApproval } from "react-icons/fc";

const Welcome = ({ state }) => {
  const user_email = state?.loggedInUser?.data?.user?.email;
  const user_google_email = state?.google_data?.profileObj?.email;
  const user_google_name = state?.google_data?.profileObj?.name;
  const user_google_photo = state?.google_data?.profileObj?.imageUrl;

  return (
    <div className="welcome_message">
      <div className="welcome_message_container">
        {user_google_photo ? <img src={user_google_photo} alt="" /> : null}

        <p>
          Welcome{" "}
          {user_google_name
            ? user_google_name
            : user_google_email || user_email}{" "}
          <FcApproval />
        </p>
      </div>
    </div>
  );
};

export default Welcome;
