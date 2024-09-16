import { NavLink, Outlet } from "react-router-dom";

const NAV_ITEMS = [
  { to: '/', label: 'Produits' },
  { to: '/add', label: 'Nouveau' }
];

const Layout = () => {
  return (
    <div>
      <nav className="bg-gray-200 flex items-center flex-wrap gap-2 p-2 justify-between">
        <h1 className="text-xl font-bold">BL Démo</h1>
        <ul className="flex flex-wrap gap-2 p-2 items-center">
          {NAV_ITEMS.map(({to, label}) => (
            <li className="nav-item" key={to}>
              <NavLink to={to} className={({ isActive }) =>
                `font-semibold ${isActive ? "text-blue-700" : ""}`
              }>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="m-3">
        <Outlet/>
      </div>
    </div>
  );
}

export default Layout;