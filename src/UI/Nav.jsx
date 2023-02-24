import { NavLink } from "react-router-dom";
import "./Nav.scss";
import Button from "./Button";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext } from "react";
import { UserContext } from "../context/usercontext";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Nav = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const currentUser = useContext(UserContext);
  if (loading)
    return (
      <nav className="nav">
        <p>...</p>
      </nav>
    );
  return (
    <header>
      <nav className="nav">
        <ul>
          <li>
            <NavLink className="navlink" to="/">
              Home
            </NavLink>
          </li>
          {currentUser && (
            <>
              <li>
                <NavLink className="navlink" to={`/user/${currentUser.uid}`}>
                  User
                </NavLink>
              </li>
              <li>
                <Button
                  size={"medium"}
                  fontSize={14}
                  text={"Log Out"}
                  onClick={() => {
                    signOut(auth)
                      .then(navigate("/"))
                      .catch((error) => {
                        console.log(error);
                      });
                  }}
                >
                  logout
                </Button>
              </li>
            </>
          )}
          {!currentUser && (
            <>
              <li>
                <NavLink to={`/login`} className="navlink">
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
