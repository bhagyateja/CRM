import { Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Contacts from './pages/Contacts';
import Deals from './pages/Deals';
// import Dashboard from './layouts/MainLayout';
import MainLayout from './layouts/MainLayout';

const App = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/deals" element={<Deals />} />
      </Routes>
    </MainLayout>
  );
};
export default App; 