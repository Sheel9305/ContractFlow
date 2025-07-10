import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUsername, setPassword, login } from '../store/authSlice';

const Login: React.FC = () => {
  const [usernameInp, setUsernameInp] = useState<string>("");
  const [passwordInp, setPasswordInp] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!usernameInp || !passwordInp) {
      setError(true);
      return;
    }

    if (usernameInp === "admin" && passwordInp === "pass@123") {
      dispatch(setUsername(usernameInp));
      dispatch(setPassword(passwordInp));
      dispatch(login());
      navigate('/');
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <input data-cy="username" type="text" placeholder="Username" onChange={(e) => setUsernameInp(e.target.value)} /><br />
      <input data-cy="password" type="password" placeholder="Password" onChange={(e) => setPasswordInp(e.target.value)} /><br /><br />

      {error && <p style={{ color: 'red' }}>Invalid username or password!</p>}

      <button data-cy="login-btn" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
