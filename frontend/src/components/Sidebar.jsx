import { useState } from "react";
import Navbar from "./Navbar";
import adminLogo from "../assets/admin.png";
import dashboardIcon from "../assets/dashboard.png";
import bookingIcon from "../assets/booking.png";
import packageIcon from "../assets/package.png";
import menuIcon from "../assets/menu.png";
import fileIcon from "../assets/file.png";
import Users from "../pages/Users";
import groupIcon from "../assets/group.png";
import informationIcon from "../assets/information.png";
import faqIcon from "../assets/faq.png";
import accountIcon from "../assets/account.png";
import settingIcon from "../assets/setting.png";
import profileImg from "../assets/ananaya.jpg";
import Dashboard from "../pages/Dashboard";
import OrderManagement from "../pages/OrderManagement";
import ProductManagement from "../pages/ProductManagement";
import Categories from "../pages/Categories";
import Reports from "../pages/Reports";
import Enquiries from "../pages/Enquiries";
import Support from "../pages/Support";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
const Sidebar = ({ darkMode, setDarkMode }) => {
  const [active, setActive] = useState("Dashboard");
  const [open, setOpen] = useState(false);
  const menuItems = [
    {
      section: "MAIN MENU",
      items: [
        { name: "Dashboard", icon: dashboardIcon },
        { name: "Order Management", icon: bookingIcon },
        { name: "Product Management", icon: packageIcon },
        { name: "Categories", icon: menuIcon },
      ],
    },
    {
      section: "ANALYTICS & PEOPLE",
      items: [
        { name: "Reports", icon: fileIcon },
        { name: "Users", icon: groupIcon },
        { name: "Enquiries", icon: informationIcon },
      ],
    },
    {
      section: "SYSTEM",
      items: [
        { name: "Support", icon: faqIcon },
        { name: "Profile", icon: accountIcon },
        { name: "Settings", icon: settingIcon },
      ],
    },
  ];
  return (
    <div
      className={`flex min-h-screen overflow-x-hidden 
    ${darkMode ? "bg-gray-900" : "bg-[#f4f7fb]"}`} >
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden" />
      )}
      <aside
        className={`fixed top-0 left-0 z-[999] h-screen w-[260px] lg:w-[280px] bg-[#111111]
  border-r border-[#222] text-white flex flex-col transition-all duration-300
  ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="flex-1 overflow-y-auto px-4 md:px-5 py-5">
          <div className="flex items-center gap-3 mb-8">
            <img src={adminLogo} alt="" className="w-9 h-9 object-contain" />
            <h1 className="text-xl lg:text-2xl font-bold text-[#d9a63d]">
              My Admin
            </h1>
          </div>
          <div className="space-y-7">
            {menuItems.map((menu, idx) => (
              <div key={idx}>
                <p className="text-[10px] tracking-[2px] text-gray-500 font-semibold mb-3">
                  {menu.section}{" "}
                </p>
                <div className="space-y-2">
                  {menu.items.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActive(item.name);
                        setOpen(false);
                      }}
                      className={` w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300
                        text-sm font-medium
                        ${
                          active === item.name
                            ? "bg-[#d9a63d] text-black shadow-lg"
                            : "text-[#d1d1d1] hover:bg-[#1b1b1b]"
                        } `}>
                      <img src={item.icon} alt=""
                        className={` w-5 h-5 object-contain
                          ${
                            active === item.name ? "" : "brightness-0 invert"
                          }`} />
                      <span className="truncate">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-[#222]">
          <div className="bg-[#1a1a1a] rounded-2xl p-3 flex items-center gap-3">
            <img  src={profileImg}  alt=""
              className="w-11 h-11 rounded-full object-cover border-2 border-[#d9a63d]" />
            <div className="min-w-0">
              <h3 className="text-sm font-semibold truncate">Ananaya</h3>
              <p className="text-xs text-gray-400 truncate">Senior Admin</p>
            </div>
          </div>
        </div>
      </aside>
     <div className="flex-1 min-h-screen flex flex-col min-w-0 overflow-hidden md:ml-[260px] lg:ml-[280px]"> 
        <Navbar setOpen={setOpen} darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="flex-1 overflow-y-auto">
          {active === "Dashboard" && <Dashboard darkMode={darkMode} />}
          {active === "Order Management" && (
            <OrderManagement darkMode={darkMode} /> )}
            {active === "Product Management" && (
  <ProductManagement darkMode={darkMode} />
)}
{active === "Users" && (
  <Users darkMode={darkMode} />
)}
{active === "Reports" && (
  <Reports darkMode={darkMode} />
)}
{active === "Categories" && (
  <Categories darkMode={darkMode} />
)}
{active === "Enquiries" && (
  <Enquiries darkMode={darkMode} />
)}
{active === "Support" && (
  <Support darkMode={darkMode} />
)}
{active === "Profile" && (
  <Profile darkMode={darkMode} />
)}
{active === "Settings" && (
  <Settings darkMode={darkMode} />
)}
          {active !== "Dashboard" &&
  active !== "Order Management" &&
  active !== "Product Management" &&
  active !== "Users" &&
  active !== "Categories" &&
  active !== "Reports" &&
  active !== "Enquiries" &&
  active !== "Support" &&
  active !== "Profile" &&
active !== "Settings" &&
   (
              <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                <div className="bg-white rounded-3xl min-h-[80vh] shadow-sm flex items-center justify-center p-6">
                  <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-700 text-center">
                    {active} Page
                  </h1>
                </div>
              </div>
            )}
        </main>
      </div>
    </div>
  );
};
export default Sidebar;

