import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  CheckSquare,
  Bell,
  CalendarCheck,
  MessageSquare,
  FileText,
  LogOut,
  LogIn,
  ChevronLeft,
  ChevronRight,
  Menu,
  MoreVertical,
} from "lucide-react";

// Asset Paths
const logo = "/logo.png";
const mobileLogo = "/mobile-logo.png"; // We can use this for the collapsed state if you prefer

type NavItem = {
  label: string;
  to: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { label: "Home", to: "/user", icon: <Home size={20} /> },
  { label: "Tasks", to: "/user/tasks", icon: <CheckSquare size={20} /> },
  {
    label: "Notifications",
    to: "/user/notifications",
    icon: <Bell size={20} />,
  },
  {
    label: "Attendance",
    to: "/user/attendance",
    icon: <CalendarCheck size={20} />,
  },
  { label: "Chats", to: "/user/chats", icon: <MessageSquare size={20} /> },
  { label: "Apply Leave", to: "/user/leave", icon: <FileText size={20} /> },
];

const UserSidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auto-close mobile menu on resize
  useEffect(() => {
    const handleResize = () =>
      window.innerWidth >= 1024 && setMobileOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* --- Mobile Trigger Button (Fixed) --- */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-800 text-green-400 shadow-lg shadow-green-500/20 border border-slate-700"
      >
        <Menu size={24} />
      </button>

      {/* --- Mobile Overlay --- */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* --- Main Sidebar --- */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50 h-screen bg-slate-950 border-r border-slate-800/50
          transition-all duration-300 ease-in-out flex flex-col
          ${expanded ? "w-72" : "w-20"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* 1. Header & Logo */}
        <div className="h-20 flex items-center px-4 relative">
          <div className="flex items-center gap-3 overflow-hidden w-full">
            <img
              src={expanded ? logo : mobileLogo}
              alt="Logo"
              className={`object-contain transition-all duration-300 ${expanded ? "w-full h-10" : "w-8 h-8 mx-auto"}`}
            />


          </div>

          {/* Desktop Toggle Button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="hidden lg:flex absolute -right-3 top-8 p-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-green-500 transition-all shadow-xl z-50"
          >
            {expanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>
        </div>

        {/* 2. Navigation Items */}
        <nav className="flex-1 flex flex-col gap-2 px-3 py-6 overflow-y">
          {navItems.map((item) => (
            <SidebarItem
              key={item.to}
              item={item}
              expanded={expanded}
              setMobileOpen={setMobileOpen}
            />
          ))}
        </nav>

        {/* 3. Footer Actions */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/50">
          <div className="flex flex-col gap-2 mb-4">
            {/* Check In Button (Glowing Green) */}
            <button
              className={`
              flex items-center rounded-xl transition-all duration-300 group relative overflow-hidden cursor-pointer
              ${expanded ? "bg-green-400/70 hover:bg-green-400 text-slate-900 px-4 py-3" : "bg-transparent hover:bg-slate-800 text-green-500 p-3 justify-center"}
            `}
            >
              <LogIn size={20} className="relative z-10" />
              <span
                className={`font-bold whitespace-nowrap ml-3 transition-all duration-300 relative z-10 ${expanded ? "w-auto opacity-100 font-bold" : "w-0 opacity-0 hidden"}`}
              >
                Check In
              </span>
              {/* Subtle inner glow for collapsed state */}
              {!expanded && (
                <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>

            {/* Logout Button */}
            <button
              className={`
              flex items-center rounded-xl transition-all duration-300 group cursor-pointer text-stone-950
              ${expanded ? "bg-white hover:bg-red-500 text-slate-300  px-4 py-3" : "bg-transparent hover:bg-slate-800 text-slate-400 hover:text-red-400 p-3 justify-center"}
            `}
            >
              <LogOut size={20} />
              <span
                className={` whitespace-nowrap ml-3 transition-all duration-300 font-bold ${expanded ? "w-auto opacity-100" : "w-0 opacity-0 hidden"}`}
              >
                Logout
              </span>
            </button>
          </div>

          {/* User Profile */}
          <div
            className={`flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/50 transition-colors cursor-pointer ${expanded ? "" : "justify-center"}`}
          >
            <div className="relative">
              <img
                src="/profile.png"
                className="w-9 h-9 rounded-full border border-slate-600 bg-slate-800 object-cover"
                alt="User"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-950 rounded-full"></span>
            </div>
            <div
              className={`flex flex-col overflow-hidden transition-all duration-300 ${expanded ? "w-32 ml-1" : "w-0 opacity-0 hidden"}`}
            >
              <span className="text-sm font-semibold text-white truncate">
                John Doe
              </span>
              <span className="text-xs text-slate-500 truncate">
                Software Eng.
              </span>
            </div>
            {expanded && (
              <MoreVertical size={16} className="text-slate-500 ml-auto" />
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

// --- Helper Component for Nav Links ---
interface SidebarItemProps {
  item: NavItem;
  expanded: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  expanded,
  setMobileOpen,
}) => {
  return (
    <NavLink
      to={item.to}
      onClick={() => setMobileOpen(false)}
      className={({ isActive }) => `
        group relative flex items-center p-3 rounded-xl transition-all duration-300 ease-in-out hover:scale-120 hover:ml-5 hover:font-extrabold
        ${
          isActive
            ? "bg-linear-to-r from-green-600/20 to-emerald-600/10 text-green-400 shadow-[inset_3px_0_0_0_#4ade80]" // The 'Cyber' Active State
            : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
        }
        ${expanded ? "" : "justify-center"}
      `}
    >
      <div className="transition-transform duration-300 group-hover:scale-110">
        {item.icon}
      </div>

      <span
        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${expanded ? "w-40 ml-3 opacity-100" : "w-0 opacity-0"}`}
      >
        {item.label}
      </span>

      {/* Floating Tooltip (Visible only when collapsed) */}
      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-slate-800 text-green-400 text-xs font-bold
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          z-50 shadow-lg border border-slate-700 whitespace-nowrap
        `}
        >
          {item.label}
        </div>
      )}
    </NavLink>
  );
};

export default UserSidebar;
