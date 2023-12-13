import { useState } from 'react';
import { login } from '../store/authSlice';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

interface SignupForm {
  name: string;
  email: string;
  password: string;
}

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<SignupForm>();

  const create = async (data: SignupForm) => {
    // console.log('data==', data);
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit(create)}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" {...register("name", { required: true })} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" {...register("email", { required: true })} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" {...register("password", { required: true })} />

        <button type="submit">Sign Up</button>
      </form>
      <div className="login-link">
        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
