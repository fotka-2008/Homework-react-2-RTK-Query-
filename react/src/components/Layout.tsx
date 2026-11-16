import { NavLink, Outlet } from 'react-router'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white">
        <nav className="max-w-3xl mx-auto flex gap-6 p-4">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'font-bold underline' : '')}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'font-bold underline' : '')}>
            About
          </NavLink>
        </nav>
      </header>
      <main className="max-w-3xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
