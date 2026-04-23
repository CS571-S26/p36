import { useState, useRef } from "react";
import { LogOut, Bookmark, LibraryBig } from "lucide-react";
import CompshareLogo from "../assets/images/compshare_logo.png";
import { Link } from "react-router-dom";
import AuthModal from "./auth/AuthModal";
import { useAuth } from "./contexts/AuthContext";

function Navbar() {
  const [openAuth, setOpenAuth] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { user, logout } = useAuth();
  const dropDownRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <nav className="w-full bg-white sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-2 text-sm">

          <Link to="/"
            className="flex items-center text-xl md:text-2xl font-bold text-[#0B2026]"
          >
            <img src={CompshareLogo} alt="Compshare Logo" className="w-9 h-9 md:w-10 md:h-10"/>
            compshare
          </Link>

          <div className="hidden md:flex gap-12 font-normal text-[#0B2026]">

            <Link to="/comps"
              className="flex items-center gap-2 hover:underline"
            >
              Comps
            </Link>

            <Link to="/build-comp"
              className="flex items-center gap-2 hover:underline"
            >
              Build Comps
            </Link>

          </div>

          {user ? (
            <div className="relative" ref={dropDownRef}>
              <button
                onClick={() => setOpenDropdown((e) => !e)}
                className="rounded-full bg-[#6891B9] w-9 h-9 text-white font-medium text-sm hover:opacity-90 hover:cursor-pointer"
              >
                {user.username[0].toUpperCase()}
              </button>

              {openDropdown && (
                <>
                  <div className="fixed inset-0" onClick={() => setOpenDropdown(false)} />
                  <div className="absolute right-0 mt-2 bg-white w-38 rounded-xl shadow-lg border border-gray-100 z-50">

                    <Link
                      to={`/users/${user.username}/mycomps`}
                      onClick={() => setOpenDropdown(false)}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm font-light hover:bg-gray-50 hover:cursor-pointer"
                    >
                      <LibraryBig size={18} />
                      My Comps
                    </Link>

                    <Link
                      to={`/users/${user.username}/bookmarks`}
                      onClick={() => setOpenDropdown(false)}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm font-light hover:bg-gray-50 hover:cursor-pointer"
                    >
                      <Bookmark size={18} />
                      Bookmarks
                    </Link>

                    <button
                      onClick={() => { logout(); setOpenDropdown(false); }}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm font-light hover:bg-gray-50 hover:cursor-pointer"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>

                  </div>
                </>
              )}
            </div>
          ) : (
            <button onClick={() => setOpenAuth(true)}
              className="hover:cursor-pointer hover:underline flex items-center gap-2 px-5 py-2 transition font-normal text-[#0B2026]"
            >
              Login
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