import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function MainLayout({ children }: any) {
  const { logout, user } = useAuth();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-6">CRM Dashboard</h1>
        <nav className="flex flex-col gap-2">
          <Link to="/">📊 Dashboard</Link>
          <Link to="/contacts">📇 Contacts</Link>
          <Link to="/deals">💼 Deals</Link>
          <button onClick={logout} className="mt-6 text-red-400">Logout</button>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-50">
        <header className="mb-4">
          <p className="text-right text-sm text-gray-500">Logged in as {user?.email}</p>
        </header>
        {children}
      </main>
    </div>
  );
}
