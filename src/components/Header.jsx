import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeCredentials } from "../api/slices/authSlice";

const linkStyle = {
  textDecoration: "none",
  color: "#000",
};

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    try {
      dispatch(removeCredentials());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to={"/"} style={linkStyle}>
          <h3 className="logo">Blog</h3>
        </Link>
        <nav className="nav">
          {userInfo ? (
            <>
              <p>{userInfo.email}</p>
              <button onClick={logoutUser} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={"/login"} style={linkStyle}>
                <span>Login</span>
              </Link>
              <Link to={"/register"} style={linkStyle}>
                <span>Register</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
