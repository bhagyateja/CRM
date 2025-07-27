import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await login({ email, password });
      loginUser(user);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input mt-2" />
      <button className="btn mt-4" onClick={handleLogin}>Login</button>
    </div>
  );
}
