import { useEffect, useState } from "react";
import downloadIcon from "../assets/download.png";
import addIcon from "../assets/add.png";
import filterIcon from "../assets/filter.png";
import dotsIcon from "../assets/dots.png";
import pencilIcon from "../assets/pencil.png";
import binIcon from "../assets/bin.png";
import sendIcon from "../assets/send.png";
import a1 from "../assets/a1.jpeg";
import a2 from "../assets/a2.jpeg";
import a3 from "../assets/a3.jpeg";
import a4 from "../assets/a4.jpeg";
import a5 from "../assets/a5.jpeg";
import orderIcon from "../assets/order.png";
import revenueIcon from "../assets/revenue.png";
import boxIcon from "../assets/box.png";
import groupIcon from "../assets/group.png";
const Dashboard = ({ darkMode }) => {
  const [activeGraph, setActiveGraph] = useState("current");
  const [activePage, setActivePage] = useState(1);
  const [cardData, setCardData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    activeUsers: 0,
  });
  const [cardsLoading, setCardsLoading] = useState(true);
  const [cardsError, setCardsError] = useState("");
  useEffect(() => {
    const loadDashboardCards = async () => {
      try {
        setCardsLoading(true);
        setCardsError("");
        const response = await fetch("/api/dashboard/cards");
        if (!response.ok) {
          throw new Error("Dashboard cards API failed");
        }
        const data = await response.json();
        setCardData(data);
      } catch (error) {
        setCardsError("Data load nahi hua");
        console.error(error);
      } finally {
        setCardsLoading(false);
      }
    };

    loadDashboardCards();
  }, []);

  const formatCount = (value) => {
    const number = Number(value || 0);

    if (number >= 1000) {
      return new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(number);
    }

    return new Intl.NumberFormat("en-US").format(number);
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      notation: Number(value || 0) >= 1000 ? "compact" : "standard",
      maximumFractionDigits: 2,
    }).format(Number(value || 0));

  const cards = [
    {
      title: "TOTAL ORDERS",
      value: formatCount(cardData.totalOrders),
      growth: "+12.5%",
      icon: orderIcon,
    },
    {
      title: "TOTAL REVENUE",
      value: formatCurrency(cardData.totalRevenue),
      growth: "+24.8%",
      icon: revenueIcon,
    },
    {
      title: "TOTAL PRODUCTS",
      value: formatCount(cardData.totalProducts),
      growth: "-2.4%",
      icon: boxIcon,
    },
    {
      title: "ACTIVE USERS",
      value: formatCount(cardData.activeUsers),
      growth: "+5.2%",
      icon: groupIcon,
    },
  ];
  const products = [
    {
      image: a1,
      name: "Classic Silk Blazer",
      category: "Apparel",
      price: "₹1,200",
      stock: "24 Units",
      status: "Active",
      dot: "bg-green-500",
    },
    {
      image: a2,
      name: "Gold Embossed Watch",
      category: "Accessories",
      price: "₹3,450",
      stock: "8 Units",
      status: "Low Stock",
      dot: "bg-yellow-500",
    },
    {
      image: a3,
      name: "Luxury Leather Tote",
      category: "Bags",
      price: "₹890",
      stock: "45 Units",
      status: "Active",
      dot: "bg-green-500",
    },
    {
      image: a4,
      name: "Velvet Night Gown",
      category: "Evening Wear",
      price: "₹2,100",
      stock: "0 Units",
      status: "Out Of Stock",
      dot: "bg-red-500",
    },
    {
      image: a5,
      name: "Diamond Stud Earrings",
      category: "Jewelry",
      price: "₹5,800",
      stock: "12 Units",
      status: "Active",
      dot: "bg-green-500",
    },
  ];
  return (
    <div
      className={`
    w-full p-4 md:p-8 transition-all duration-300 min-h-screen
    ${darkMode
          ? "bg-[#0f172a] text-white"
          : "bg-[#f4f7fb] text-black"
        } `}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h1
            className={`text-3xl md:text-5xl font-bold ${darkMode ? "text-white" : "text-[#111827]"}`}>
            Dashboard Overview </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-lg">
            Welcome back, Julian. Here's what's happening today.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button className=" flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-gray-200 hover:shadow-lg
            transition-all duration-300 ">
            <img src={downloadIcon} alt="" className="w-4 h-4" />
            <span className="font-medium text-yellow-900 text-sm">Export</span>
          </button>
          <button className=" flex items-center gap-3 bg-[#d9a63d] text-black px-6 py-3 rounded-2xl
            shadow-lg hover:scale-105 transition-all duration-300 " >
            <img src={addIcon} alt="" className="w-4 h-4" />
            <span className="font-semibold text-sm">New Product</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
        {cards.map((card, index) => (
          <div key={index}
            className=" relative overflow-hidden rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500
            hover:-translate-y-2 group cursor-pointer border border-white/20 ">
            <div
              className={` absolute inset-0
              ${index === 0
                  ? "bg-[linear-gradient(135deg,#f3d3b5,#b78457,#6f4e37)]"
                  : index === 1
                    ? "bg-[linear-gradient(135deg,#f3d3b5,#b78457,#6f4e37)]"
                    : index === 2
                      ? "bg-[linear-gradient(135deg,#f3d3b5,#b78457,#6f4e37)]"
                      : "bg-[linear-gradient(135deg,#f3d3b5,#b78457,#6f4e37)]"
                } `}></div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="flex items-start justify-between relative z-10">
              <div className=" w-14 h-14 rounded-2xl bg-white/90 flex items-center justify-center
                shadow-lg ">
                <img src={card.icon} alt="" className="w-7 h-7" />
              </div>
              <span className={` text-xs font-semibold px-3 py-1 rounded-full
                ${card.growth.includes("-")
                  ? "bg-red-100 text-red-600"
                  : "bg-black/80 text-white"} `} >
                {card.growth}
              </span>
            </div>
            <div className="mt-8 relative z-10">
              <p className="text-xs tracking-[2px] text-white/80 font-semibold">
                {card.title}</p>
              <h2 className="text-4xl font-bold mt-3 text-white">
                {cardsLoading ? "..." : card.value}
              </h2>
              {cardsError && index === 0 && (
                <p className="text-xs text-red-100 mt-2">{cardsError}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6 mt-8">
        <div
          className={`2xl:col-span-2 rounded-[28px] border p-4 sm:p-5 md:p-6 overflow-hidden ${darkMode
              ? "bg-[#1e293b] border-gray-700"
              : "bg-[#f7f7f7] border-gray-200"}`}>
          <div
            className=" flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6 ">
            <div>
              <h2
                className=" text-[13px] sm:text-[15px] font-bold tracking-[2px] sm:tracking-[3px]
          text-[#1f1f1f] " >
                REVENUE ANALYTICS </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Monthly performance overview</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button onClick={() => setActiveGraph("current")}
                className=" flex items-center gap-2 text-xs sm:text-sm ">
                <div className={` w-2.5 h-2.5 rounded-full
            ${activeGraph === "current"
                    ? "bg-[#c89a33]"
                    : "bg-[#d1b067]"} `}></div>
                <span className="text-gray-600 font-medium whitespace-nowrap">
                  Current Year
                </span>
              </button>
              <button onClick={() => setActiveGraph("previous")}
                className=" flex items-center gap-2 text-xs sm:text-sm ">
                <div className={`
            w-2.5 h-2.5 rounded-full
            ${activeGraph === "previous"
                    ? "bg-[#8b8b8b]"
                    : "bg-[#cfcfcf]"}`} ></div>
                <span className="text-gray-600 font-medium whitespace-nowrap">
                  Previous Year
                </span>
              </button>
            </div>
          </div>
          <div
            className=" relative w-full h-[240px] sm:h-[300px] md:h-[340px] pl-8 sm:pl-10 pb-8 ">
            <div className="absolute inset-0 flex flex-col justify-between">
              {[...Array(5)].map((_, i) => (
                <div key={i}
                  className="border-t border-dashed border-[#d9d9d9] w-full" ></div>
              ))}
            </div>
            <div
              className=" absolute left-0 top-0 h-full flex flex-col justify-between
        text-[9px] sm:text-[11px] text-gray-400">
              <span>80000</span>
              <span>60000</span>
              <span>40000</span>
              <span>20000</span>
              <span>0</span>
            </div>
            <svg viewBox="0 0 700 300"
              className=" absolute left-8 sm:left-10 top-0 w-[calc(100%-2rem)] sm:w-[calc(100%-2.5rem)] h-full"
              preserveAspectRatio="none" >
              {activeGraph === "current" && (
                <>
                  <defs>
                    <linearGradient
                      id="goldGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1">
                      <stop offset="0%" stopColor="#c89a33" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#c89a33" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="
             M0 170
              C60 145,120 135,180 155
              C240 175,300 70,360 100
              C420 130,500 70,560 45
              C620 25,660 20,700 18
              L700 300
              L0 300
              Z"
                    fill="url(#goldGradient)" />
                  <path
                    d="
              M0 170
              C60 145,120 135,180 155
              C240 175,300 70,360 100
              C420 130,500 70,560 45
              C620 25,660 20,700 18 "
                    fill="none"
                    stroke="#c89a33"
                    strokeWidth="4"
                    strokeLinecap="round" />
                </>
              )}
              {activeGraph === "previous" && (
                <>
                  <defs>
                    <linearGradient
                      id="grayGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1">
                      <stop
                        offset="0%"
                        stopColor="#9ca3af"
                        stopOpacity="0.25" />
                      <stop
                        offset="100%"
                        stopColor="#9ca3af"
                        stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="
              M0 210
              C70 180,130 170,190 190
              C250 205,320 150,390 160
              C450 170,520 130,580 115
              C640 105,680 95,700 85
              L700 300
              L0 300
              Z
              "
                    fill="url(#grayGradient)" />
                  <path
                    d="
              M0 210
              C70 180,130 170,190 190
              C250 205,320 150,390 160
              C450 170,520 130,580 115
              C640 105,680 95,700 85
              "
                    fill="none"
                    stroke="#7b8794"
                    strokeWidth="4"
                    strokeLinecap="round" />
                </>
              )}
            </svg>
            <div
              className="
        absolute
        bottom-0
        left-8 sm:left-10
        right-0
        flex justify-between
        text-[9px] sm:text-[11px]
        text-gray-500
        pr-1
        ">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
            </div>
          </div>
        </div>
        <div
          className="
    bg-[#f7f7f7]
    rounded-[28px]
    p-4 sm:p-6
    border border-gray-200
    overflow-hidden " >
          <h2
            className=" text-[13px] sm:text-[15px] font-bold tracking-[2px] sm:tracking-[3px] text-[#1f1f1f] " >
            SALES PERFORMANCE
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Distribution by channel</p>
          <div className="flex justify-center items-center mt-6 sm:mt-8">
            <div
              className=" relative w-36 h-36 sm:w-44 sm:h-44 " >
              <svg viewBox="0 0 36 36"
                className="w-full h-full -rotate-90" >
                <path
                  d="
            M18 2.5
            a 15.5 15.5 0 1 1 0 31
            a 15.5 15.5 0 1 1 0 -31
            "
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="3" />
                <path
                  d="
            M18 2.5
            a 15.5 15.5 0 1 1 0 31
            a 15.5 15.5 0 1 1 0 -31
            "
                  fill="none"
                  stroke="#c89a33"
                  strokeWidth="3"
                  strokeDasharray="45 100" />
                <path
                  d="
            M18 2.5
            a 15.5 15.5 0 1 1 0 31
            a 15.5 15.5 0 1 1 0 -31
            "
                  fill="none"
                  stroke="#1f1f1f"
                  strokeWidth="3"
                  strokeDasharray="25 100"
                  strokeDashoffset="-48" />
                <path
                  d="
            M18 2.5
            a 15.5 15.5 0 1 1 0 31
            a 15.5 15.5 0 1 1 0 -31
            "
                  fill="none"
                  stroke="#d1d5db"
                  strokeWidth="3"
                  strokeDasharray="15 100"
                  strokeDashoffset="-75"
                />
              </svg>

              {/* CENTER */}
              <div
                className="
          absolute
          inset-6 sm:inset-7
          bg-[#f7f7f7]
          rounded-full
          "
              ></div>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#c89a33]"></div>
                <span className="text-yellow-900">Direct</span>
              </div>
              <span className="font-semibold text-yellow-900">400%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                <span className="text-yellow-900">Social</span>
              </div>
              <span className="font-semibold text-yellow-900">300%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#d1d5db]"></div>
                <span className="text-yellow-900">Referral</span>
              </div>
              <span className="font-semibold text-yellow-900">200%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#8b8b8b]"></div>
                <span className="text-yellow-900">Email</span>
              </div>
              <span className="font-semibold text-yellow-900">100%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
        <div className="bg-[#e0b85b] px-4 md:px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-[15px] md:text-lg font-bold tracking-[3px] text-[#1f1f1f]">
              PRODUCT MANAGEMENT </h2>
            <p className="text-sm text-[#4b5563] mt-1">
              Overview of your current inventory and listings
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className=" flex items-center gap-2 bg-white px-5 py-3 rounded-2xl " >
              <img src={filterIcon} alt="" className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide text-yellow-900">
                FILTER
              </span>
            </button>
            <button>
              <img src={dotsIcon} alt="" className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-[#f7f7f7] border-b border-gray-200">
              <tr className="text-left">
                <th className="px-4 sm:px-6 md:px-8 py-4 md:py-5 text-[12px] sm:text-[13px] md:text-[14px]
    tracking-[1px] sm:tracking-[2px] text-black font-bold whitespace-nowrap">
                  PRODUCT
                </th>
                <th className="px-4 sm:px-6 py-4 md:py-5 text-[12px] sm:text-[13px] md:text-[14px]
    tracking-[1px] sm:tracking-[2px] text-black font-bold whitespace-nowrap">
                  NAME
                </th>
                <th className="px-4 sm:px-6 py-4 md:py-5 text-[12px] sm:text-[13px] md:text-[14px]
    tracking-[1px] sm:tracking-[2px] text-black font-bold whitespace-nowrap">
                  CATEGORY
                </th>
                <th className="px-4 sm:px-6 py-4 md:py-5 text-[12px] sm:text-[13px] md:text-[14px]
    tracking-[1px] sm:tracking-[2px] text-black font-bold whitespace-nowrap">
                  PRICE
                </th>
                <th className="px-4 sm:px-6 py-4 md:py-5 text-[12px] sm:text-[13px] md:text-[14px]
    tracking-[1px] sm:tracking-[2px] text-black font-bold whitespace-nowrap">
                  STOCK
                </th>
                <th className="px-4 sm:px-6 py-4 md:py-5 text-[12px] sm:text-[13px] md:text-[14px]
    tracking-[1px] sm:tracking-[2px] text-black font-bold whitespace-nowrap">
                  STATUS
                </th>
                <th className="px-4 sm:px-6 py-4 md:py-5 text-[12px] sm:text-[13px] md:text-[14px]
    tracking-[1px] sm:tracking-[2px] text-black font-bold text-center whitespace-nowrap">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={index} className=" border-b border-gray-100 hover:bg-[#fafafa] transition-all duration-300">
                  <td className="px-8 py-5">
                    <img src={item.image} alt=""
                      className="  w-12 h-12 rounded-full object-cover border border-gray-200" />
                  </td>
                  <td className="px-6 py-5">
                    <h3 className="font-semibold text-[#1f2937] whitespace-nowrap">
                      {item.name}
                    </h3>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className=" px-4 py-2 rounded-full bg-[#f3f4f6] text-xs text-gray-600 ">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-bold text-[#111827]">
                    {item.price}
                  </td>
                  <td className="px-6 py-5 font-semibold">
                    {item.stock}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.dot}`}></div>
                      <span className="text-sm">{item.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-5">
                      <button>
                        <img src={pencilIcon} alt="" className="w-4 h-4" />
                      </button>
                      <button>
                        <img src={binIcon} alt="" className="w-4 h-4" />
                      </button>
                      <button>
                        <img src={sendIcon} alt="" className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-5 px-6 py-6 " >
          <p className="text-sm text-gray-500 italic">
            Showing 1 to 5 of 842 items
          </p>
          <div className="flex items-center gap-3">
            <button className="text-sm text-gray-400 hover:text-black">
              Previous
            </button>
            {[1, 2, 3].map((page) => (
              <button key={page} onClick={() => setActivePage(page)}
                className={` w-10 h-10 rounded-full
                font-semibold transition-all duration-300
                ${activePage === page
                    ? "bg-[#d4a63a] text-white shadow-lg scale-110"
                    : "bg-transparent text-gray-600 hover:bg-gray-100"} `}>
                {page}
              </button>
            ))}
            <button className="text-sm text-gray-700 hover:text-black">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
