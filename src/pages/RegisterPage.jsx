import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../api/slices/usersApiSlice";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const [register, { isLoading, error: isError }] = useRegisterMutation();

  const registerUser = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(true);
    } else {
      setError(false);
      try {
        await register({ name, email, password }).unwrap();
        navigate("/login");
      } catch (error) {
        console.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <div className="page register_page">
      <form onSubmit={registerUser} className="form form-register">
        <header>
          <h1>Register</h1>
        </header>
        <div className="fields-parent">
          <div className="fields-child">
            <label>Name</label>
            <input
              className="inputs"
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="fields-child">
            <label>Confirm Password</label>
            <input
              className="inputs"
              type="password"
              placeholder="Re-enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">Password do not match.</p>}
          {isError && <p className="error">{isError?.data?.message}</p>}
          <button disabled={isLoading} className="btn btn-register">
            Sign Up
          </button>
        </div>
        <p className="form-text-bottom">
          Already have an account? <Link to={"/login"}>Login</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
