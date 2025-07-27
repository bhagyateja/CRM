import { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [org, setOrg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    await register({ email, password, orgName: org });
    alert('Registered successfully!');
    navigate('/login');
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Register</h2>
      <input placeholder="Org Name" value={org} onChange={(e) => setOrg(e.target.value)} className="input" />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input mt-2" />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input mt-2" />
      <button className="btn mt-4" onClick={handleRegister}>Register</button>
    </div>
  );
}
