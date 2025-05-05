import {
  LayoutDashboard,
  List,
  Newspaper,
  Settings,
  Users,
} from "lucide-react";
import Logout from "./Logout";
import { href, Link } from "react-router-dom";
import React, { useState } from "react";
import logo from "../assets/logo.png" ;

type SidebarItem = {
  name: string;
  icon: React.ElementType;
  color: string;
  href: string;
};

const Sidebaritems: SidebarItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, color: "#94A3B8", href: "/" },
  { name: "News", icon: Newspaper, color: "#94A3B8", href: "/news" },
  { name: "Authors", icon: Users, color: "#94A3B8", href: "/authors" },
  { name: "Category", icon: List, color: "#94A3B8", href: "/categories" },
  { name: "Settings", icon: Settings, color: "#94A3B8", href: "/settings" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  return (

   <div className="h-screen bg-[#1B1F3B] flex flex-col p-6 w-auto">
      <img src={logo} alt="dummy logo image"  className="h-8"/>
      <nav className="mt-10 flex-grow">
        {Sidebaritems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center mb-11 text-[#CBD5E1] hover:text-blue-300 transition-colors"
            >
              <Icon className="mr-6 text-xl" color={item.color} />
              <span className="text-[#CBD5E1]text-lg font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
      <Logout />
    </div>
  );
};

export default Sidebar;
