import searchIcon from "../assets/search.png";
import sunIcon from "../assets/sun.png";
import moonIcon from "../assets/moon.png";
import notificationIcon from "../assets/notification.png";
import messageIcon from "../assets/msg.png";
import menuMobileIcon from "../assets/menu1.png";
import userImg from "../assets/u2.jpg";
const Navbar = ({ setOpen, darkMode, setDarkMode }) => {
  return (
<nav
  className={`
    sticky top-0 z-30
    w-full
    border-b
    px-3 sm:px-5 md:px-7 py-3
    flex flex-col lg:flex-row
    lg:items-center lg:justify-between
    gap-3
    backdrop-blur-xl
    transition-all duration-300
    ${
      darkMode
        ? "bg-gray-900/95 border-gray-700 text-white"
        : "bg-white/95 border-gray-200 text-black"
    }
  `}>
      <div className="flex items-center gap-3 w-full lg:flex-1">
        <button onClick={() => setOpen(true)}
          className={`  md:hidden flex items-center justify-center  p-2.5 rounded-xl shadow-md
            transition-all duration-300
            ${
              darkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-black hover:bg-gray-900" }`}>
          <img src={menuMobileIcon} alt="menu" className="w-5 h-5 object-contain invert" />
        </button>
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-full flex-1 w-full  transition-all duration-300
            ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
          <img src={searchIcon} alt="search"
            className="w-4 h-4 md:w-5 md:h-5 object-contain opacity-80" />
          <input  type="text" placeholder="Search analytics, products..."
            className={` bg-transparent outline-none w-full min-w-0 text-sm md:text-base font-medium
              ${
                darkMode
                  ? "placeholder:text-gray-400 text-white"
                  : "placeholder:text-gray-500 text-black"  } `} />
            </div>
            </div>
      <div className=" flex items-center justify-between sm:justify-end gap-1 sm:gap-3 w-full lg:w-auto ">
        <div className="flex items-center gap-1 sm:gap-2">
          <button onClick={() => setDarkMode(false)}
            className={`
              p-2 md:p-3 rounded-full
              transition-all duration-300
                 ${
                !darkMode
                  ? "bg-yellow-100 shadow-lg scale-105"
                  : "hover:bg-gray-700" } `} >
            <img src={sunIcon} alt="light" className="w-4 h-4 md:w-5 md:h-5 object-contain" />
             </button>
       <button onClick={() => setDarkMode(true)}
           className={`  p-2 md:p-3 rounded-full   transition-all duration-300
              ${
                darkMode
                  ? "bg-gray-700 shadow-lg scale-105"
                  : "hover:bg-gray-200" } `}>
            <img  src={moonIcon}  alt="dark"  className="w-4 h-4 md:w-5 md:h-5 object-contain"/>
          </button>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
          <button className={`   p-2 md:p-3 rounded-full   transition-all duration-300
              ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} `}>
            <img src={notificationIcon} alt="notification" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
          </button>
          <button className={` p-2 md:p-3 rounded-full transition-all duration-300
              ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} `}>
            <img src={messageIcon} alt="message"
              className="w-5 h-5 md:w-6 md:h-6 object-contain"/>
          </button>
        </div>
        <div className={` flex items-center gap-2 pl-2 sm:pl-4 border-l ${darkMode ? "border-gray-700" : "border-gray-300"}
          `}>
          <div className="block text-right">
            <h3 className="text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap">
              Julian Vane
            </h3>
            <p className={`
                text-[10px] sm:text-xs md:text-sm
                ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500" } `} >
              Admin Portal
            </p>
          </div>
          <img  src={userImg}  alt="user"
         className=" w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full object-cover border-2 border-white shadow-lg " />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
