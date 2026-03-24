import { useState } from "react";
import { TrendingUp, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import AuthModal from "./auth/AuthModal";
import { useAuth } from "./contexts/AuthContext";

function Navbar() {
  const [openAuth, setOpenAuth] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-4">

          <Link to="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 to-sky-700 bg-clip-text text-transparent"
          >
            TFT CompShare
          </Link>

          <div className="flex gap-12 font-semibold text-gray-600">

            <Link to="#"
              className="flex items-center gap-2 hover:text-sky-700 transition"
            >
              <TrendingUp className="w-5 h-5"/>
              Trending
            </Link>

            <Link to="#"
              className="flex items-center gap-2 hover:text-sky-700 transition"
            >
              Build Comps
            </Link>

          </div>

          {user ? (
            <div>
              <button
                onClick={() => setOpenDropdown((e) => !e)}
                className="rounded-full bg-[#6891B9] w-9 h-9 text-white font-medium text-sm hover:opacity-90 hover:cursor-pointer"
              >
                {user.username[0].toUpperCase()}
              </button>

              {openDropdown && (
                <div className="right-0 bg-white w-44 rounded-xl shadow-lg border border-gray-100 py-1 z-50">

                  <Link
                    to="#"
                    onClick={() => setOpenDropdown(false)}
                    className="text-sm font-light"
                  >
                    My Comps
                  </Link>

                  <button
                    onClick={() => { logout(); setOpenDropdown(false); }}
                    className="text-sm font-light"
                  >
                    Log Out
                  </button>

                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setOpenAuth(true)}
              className="hover:text-sky-800 hover:cursor-pointer flex items-center gap-2 px-5 py-2 transition font-medium"
            >
              <LogIn className="w-5 h-5"/>
              Log In
            </button>
          )}
        </div>
      </nav>

      <AuthModal 
        open={openAuth}
        onClose={() => setOpenAuth(false)}
      />
    </>
  )
}

export default Navbar;