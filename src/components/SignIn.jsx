import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import "./SignIn.css";
export function SignIn({ isOpen, toggleBar }) {
  const menuDots = <FontAwesomeIcon icon={faEllipsisVertical} size="xl" />;
  const userIcon = <FontAwesomeIcon icon={faCircleUser} />;
  return (
    <>
      <div className="Sign-Container">
        <span className="menuDots">{menuDots}</span>
        <Link to="/register" className="Sign-btn">
          <span>{userIcon}</span>Sign in
        </Link>
      </div>
    </>
  );
}
