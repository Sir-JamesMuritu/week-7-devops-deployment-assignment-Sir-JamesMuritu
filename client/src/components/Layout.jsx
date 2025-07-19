import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  BookOpen,
  Home,
  User,
  Users,
  FileText,
  LogOut,
  Menu,
  X,
  Library,
} from "lucide-react";

const Layout = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Books", href: "/books", icon: BookOpen },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const adminNavigation = [
    { name: "Manage Users", href: "/admin/users", icon: Users },
    { name: "Transactions", href: "/admin/transactions", icon: FileText },
  ];

  const NavItem = ({ item, mobile = false }) => (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
          isActive
            ? "bg-primary-100 text-primary-700"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        } ${mobile ? "text-base px-3 py-2" : ""}`
      }
      onClick={() => mobile && setSidebarOpen(false)}
    >
      <item.icon
        className={`mr-3 flex-shrink-0 h-5 w-5 ${mobile ? "h-6 w-6" : ""}`}
        aria-hidden="true"
      />
      {item.name}
    </NavLink>
  );

  return (
    <div className="h-screen flex bg-classic-bg-50">
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-700 bg-opacity-60"
          onClick={() => setSidebarOpen(false)}
        />

        {/* Mobile sidebar */}
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-2xl rounded-r-2xl border-r border-accent-100">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-400 bg-accent-100"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-accent-700" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 h-0 pt-7 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-6 mb-10">
              <Library className="h-9 w-9 text-accent-500" />
              <span className="ml-3 text-2xl font-extrabold text-primary-900 tracking-tight">
                Masomo-Library
              </span>
            </div>

            <nav className="px-4 space-y-2">
              {navigation.map((item) => (
                <NavItem key={item.name} item={item} mobile />
              ))}

              {isAdmin && (
                <div className="pt-6 mt-6 border-t border-accent-100">
                  <p className="px-3 text-xs font-semibold text-accent-600 uppercase tracking-wider">
                    Admin
                  </p>
                  <div className="mt-3 space-y-2">
                    {adminNavigation.map((item) => (
                      <NavItem key={item.name} item={item} mobile />
                    ))}
                  </div>
                </div>
              )}
            </nav>
          </div>

          <div className="flex-shrink-0 flex border-t border-accent-100 p-5 bg-classic-bg-100 rounded-b-2xl">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-11 w-11 rounded-full bg-accent-100 flex items-center justify-center shadow">
                  <User className="h-6 w-6 text-accent-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-base font-semibold text-primary-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-accent-700 capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="ml-auto p-2 text-accent-400 hover:text-accent-700 transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-72">
          <div className="flex flex-col h-0 flex-1 bg-white shadow-2xl rounded-r-2xl border-r border-accent-100">
            <div className="flex items-center h-20 flex-shrink-0 px-6 border-b border-accent-100">
              <Library className="h-9 w-9 text-accent-500" />
              <span className="ml-3 text-2xl font-extrabold text-primary-900 tracking-tight">
                Masomo-Library
              </span>
            </div>

            <div className="flex-1 flex flex-col overflow-y-auto pt-7 pb-4">
              <nav className="flex-1 px-4 space-y-2">
                {navigation.map((item) => (
                  <NavItem key={item.name} item={item} />
                ))}

                {isAdmin && (
                  <div className="pt-6 mt-6 border-t border-accent-100">
                    <p className="px-3 text-xs font-semibold text-accent-600 uppercase tracking-wider">
                      Admin
                    </p>
                    <div className="mt-3 space-y-2">
                      {adminNavigation.map((item) => (
                        <NavItem key={item.name} item={item} />
                      ))}
                    </div>
                  </div>
                )}
              </nav>
            </div>

            <div className="flex-shrink-0 flex border-t border-accent-100 p-5 bg-classic-bg-100 rounded-b-2xl">
              <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                  <div className="h-11 w-11 rounded-full bg-accent-100 flex items-center justify-center shadow">
                    <User className="h-6 w-6 text-accent-600" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-base font-semibold text-primary-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-accent-700 capitalize">
                    {user?.role}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-2 p-2 text-accent-400 hover:text-accent-700 rounded-md hover:bg-accent-100 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between bg-white px-6 py-3 border-b border-accent-100 shadow-sm">
            <button
              type="button"
              className="p-2 rounded-md text-accent-400 hover:text-accent-700 hover:bg-accent-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-400"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex items-center">
              <Library className="h-9 w-9 text-accent-500" />
              <span className="ml-3 text-xl font-extrabold text-primary-900 tracking-tight">
                Masomo-Library
              </span>
            </div>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none px-4 sm:px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
