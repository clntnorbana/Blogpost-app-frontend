import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/slices/usersApiSlice";
import { setCredentials } from "../api/slices/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, error }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      console.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="page login_page">
      <form onSubmit={loginUser} className="form form-login">
        <header>
          <h1>Login</h1>
        </header>
        <div className="fields-parent">
          <div className="fields-child">
            <label>Email</label>
            <input
              className="inputs"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="fields-child">
            <label>Password</label>
            <input
              className="inputs"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p className="error">{error?.data?.message || error.error}</p>
          )}
          <button disabled={isLoading} className="btn btn-login">
            Sign in
          </button>
        </div>
        <p className="form-text-bottom">
          Don't have an account? <Link to={"/register"}>Register</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
