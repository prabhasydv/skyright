import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const navigate = useNavigate();

  const closeMenu = () => setOpen(false);

  /* ---------------- SYNC AUTH STATE ---------------- */
  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    // Initial load
    syncUser();

    // Listen for login/logout changes
    window.addEventListener("auth-change", syncUser);

    return () => {
      window.removeEventListener("auth-change", syncUser);
    };
  }, []);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error(err);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // 🔥 notify navbar immediately
    window.dispatchEvent(new Event("auth-change"));

    setProfileOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <nav className="sticky top-4 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4">

        {/* Floating Navbar */}
        <div className="bg-orange-50/80 backdrop-blur-xl border border-orange-200 shadow-lg rounded-[32px] px-6 py-6 md:py-4 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" onClick={closeMenu} className="flex items-center">
            <div className="h-28 md:h-36 -mb-10 -mt-10 md:-mb-12 md:-mt-12">
              <img
                src={logo}
                alt="Skyright Legal Logo"
                className="h-full w-auto object-contain scale-150 md:scale-125"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10 text-sm font-medium text-orange-900">
            <li className="cursor-pointer px-3 py-1 rounded-full hover:bg-orange-100 transition">
              <Link to="/check-compensation">Check Compensation</Link>
            </li>
            <Link to="/know-your-rights">
            <li className="flex items-center gap-1 cursor-pointer px-3 py-1 rounded-full hover:bg-orange-100 transition">
              Know Your Rights 
              {/* <ChevronDown size={14} /> */}
            </li>
            </Link>
            <Link to='/news'>
            <li className="flex items-center gap-1 cursor-pointer px-3 py-1 rounded-full hover:bg-orange-100 transition">
              News 
              {/* <ChevronDown size={14} /> */}
            </li>
            </Link>
            <Link to='/refer-a-friend'>
            <li className="cursor-pointer px-3 py-1 rounded-full hover:bg-orange-100 transition">
              Refer a Friend
            </li>
            </Link>
          </ul>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3 relative">

            {/* ---------- NOT LOGGED IN ---------- */}
            {!user && (
              <>
                <Link to="/login">
                  <button className="px-6 py-2 text-sm font-semibold border border-black rounded-full hover:scale-105 transition">
                    Login
                  </button>
                </Link>

                <Link to="/signup">
                  <button className="relative px-6 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg hover:scale-105 transition">
                    <span className="absolute inset-0 rounded-full bg-orange-400 blur opacity-30"></span>
                    <span className="relative">Sign up</span>
                  </button>
                </Link>
              </>
            )}

            {/* ---------- LOGGED IN ---------- */}
            {user && (
  <div className="flex items-center gap-3 relative">

    {/* ✅ CHECK CLAIM STATUS BUTTON */}
    <Link to="/claim-status">
      <button className="px-5 py-2.5 mr-10 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg hover:scale-105 transition">
        Check Claim Status
      </button>
    </Link>

    {/* PROFILE DROPDOWN */}
    <div ref={profileRef} className="relative">
      {/* Profile Icon */}
      <div
        onClick={() => setProfileOpen((prev) => !prev)}
        className="w-11 h-11 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold cursor-pointer"
      >
        {user.name?.charAt(0).toUpperCase()}
      </div>

      {/* Dropdown */}
      {profileOpen && (
        <div className="absolute right-0 top-14 w-44 bg-white rounded-xl shadow-lg border overflow-hidden z-50">

          {/* ADMIN DASHBOARD */}
          {user.role === "admin" && (
            <button
              onClick={() => {
                setProfileOpen(false);
                navigate("/admin/dashboard");
              }}
              className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100"
            >
              Dashboard
            </button>
          )}

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-100 text-red-600 ${
              user.role === "admin" ? "border-t" : ""
            }`}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  </div>
)}



          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-orange-600"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
  <div className="mt-4 bg-orange-50/95 backdrop-blur-xl border border-orange-200 shadow-lg rounded-[28px] px-6 py-6 space-y-4 text-orange-900 md:hidden">

    {/* COMMON LINK */}
    <Link
      to="/check-compensation"
      onClick={closeMenu}
      className="block px-4 py-3 rounded-full hover:bg-orange-100 transition text-sm font-medium"
    >
      Check Compensation
    </Link>

    {/* ---------- LOGGED IN ---------- */}
    {user && (
      <>
        {/* CHECK CLAIM STATUS */}
        <Link
          to="/claim-status"
          onClick={closeMenu}
          className="block text-center px-4 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-md"
        >
          Check Claim Status
        </Link>

        {/* PROFILE CARD */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white shadow-sm border">
          <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div className="text-sm">
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* ADMIN DASHBOARD */}
        {user.role === "admin" && (
          <button
            onClick={() => {
              closeMenu();
              navigate("/admin/dashboard");
            }}
            className="w-full px-4 py-3 rounded-full border text-sm font-semibold hover:bg-orange-100"
          >
            Dashboard
          </button>
        )}

        {/* LOGOUT */}
        <button
          onClick={() => {
            closeMenu();
            handleLogout();
          }}
          className="w-full px-4 py-3 rounded-full bg-red-500 text-white text-sm font-semibold"
        >
          Logout
        </button>
      </>
    )}

    {/* ---------- NOT LOGGED IN ---------- */}
    {!user && (
      <div className="flex flex-col gap-3 pt-2">
        <Link to="/login" onClick={closeMenu}>
          <button className="w-full px-4 py-3 border border-orange-300 rounded-full text-sm font-semibold">
            Login
          </button>
        </Link>

        <Link to="/signup" onClick={closeMenu}>
          <button className="w-full px-4 py-3 bg-orange-500 text-white rounded-full text-sm font-semibold">
            Sign up
          </button>
        </Link>
      </div>
    )}
  </div>
)}

      </div>
    </nav>
  );
};

export default Navbar;
