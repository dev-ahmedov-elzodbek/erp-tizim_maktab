import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "./Icon";
import useUserStore from "../../store/user.store";
import { removeItem } from "../../utils/localstorage";
import type { IconName } from "../../types/dashboard.type";

interface ProfileDropdownProps {
  name?: string;
  email?: string;
}

const menuItems: { label: string; icon: IconName; path: string }[] = [
  { label: "Dashboard", icon: "home", path: "/dashboard" },
  { label: "Profilim", icon: "user", path: "/dashboard" },
  { label: "Sozlamalar", icon: "settings", path: "/dashboard" },
];

const ProfileDropdown = ({ name, email }: ProfileDropdownProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    removeItem();
    logout();
    setOpen(false);
    navigate("/");
  };

  const initial = name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-x-2 rounded-lg py-1.5 pl-1.5 pr-2 transition-colors hover:bg-gray-50"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
          {initial}
        </span>
        <span className="hidden text-sm font-medium text-gray-700 sm:block">
          {name}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg shadow-gray-200/70"
        >
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="truncate text-sm font-semibold text-gray-900">
              {name}
            </p>
            {email && <p className="truncate text-xs text-gray-400">{email}</p>}
          </div>

          <div className="py-1">
            {menuItems.map((item) => {
              const IconComponent = Icon[item.icon];
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-x-3 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                  role="menuitem"
                >
                  <IconComponent />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-gray-100 py-1">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-x-3 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
              role="menuitem"
            >
              <Icon.logout />
              Chiqish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
