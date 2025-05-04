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
  { name: "Dashboard", icon: LayoutDashboard, color: "gray", href: "/" },
  { name: "News", icon: Newspaper, color: "gray", href: "/news" },
  { name: "Authors", icon: Users, color: "gray", href: "/authors" },
  { name: "Category", icon: List, color: "gray", href: "/categories" },
  { name: "Settings", icon: Settings, color: "gray", href: "/settings" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  return (

    <div className="h-screen bg-gray-100 flex flex-col p-6 w-auto">
      <img src={logo} alt="dummy logo image"  className="h-24"/>
      <nav className="mt-10 flex-grow">
        {Sidebaritems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center mb-11 text-gray-700 hover:text-blue-300 transition-colors"
            >
              <Icon className="mr-6 text-xl" color={item.color} />
              <span className="text-gray-700 text-lg font-medium">
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
