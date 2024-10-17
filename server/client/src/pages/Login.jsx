import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password };
      const res = await loginUser(data).unwrap();
      console.log("User data:", res);
      //? const { token, user } = res;  destructuring the res
      dispatch(setUser({ user: res }));
      alert("Login Successful");
      navigate("/");
    } catch (error) {
      setMessage("Please provide valid login credentials");
    }
  };

  return (
    <div className="max-w-sm bg-white mx-auto p-8 mt-36">
      <h2 className="text-2xl font-semibold pt-5">Please Login</h2>
      <form onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto pt-8">
        <input
          type="text"
          value={email}
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-bgPrimary focus:outline-none py-3 px-5"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-bgPrimary focus:outline-none py-3 px-5"
        />

        {message && <p className="text-red-500">{message}</p>}
        <button
          disabled={isLoading}
          className="w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="my-5 text-center">
        Don't have an account?{" "}
        <Link className="italic text-blue-700" to={"/register"}>
          Register
        </Link>{" "}
        here
      </p>
    </div>
  );
};

export default Login;
