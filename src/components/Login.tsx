import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<LoginForm>();
  const [error, setError] = useState<string>("");

  const login = async (data: LoginForm) => {
    console.log('data==', data);
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log('usr fet data==', userData);
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit(login)}>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" {...register("email", { required: true })} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" {...register("password", { required: true })} />

        <button type="submit">Login</button>
      </form>
      <div className="create-account-link">
        <p>Don't have an account?</p>
        <Link to="/signup">Create New Account</Link>
      </div>
    </div>
  );
}

export default Login;
