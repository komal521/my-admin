import React, { useState, useEffect } from "react";
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";
import rightUp from "../assets/right-up.png";
import rightUp1 from "../assets/right-up1.png";
import checkoutIcon from "../assets/checkout.png";
import userIcon from "../assets/user.png";
import growthIcon from "../assets/growth.png";
import filterIcon from "../assets/filter.png";
import downloadIcon from "../assets/download.png";

const defaultStats = [
  {
    title: "Total Revenue",
    value: "₹124,592",
    icon: rightUp,
    percent: "+12.5%",
  },
  {
    title: "Total Orders",
    value: "1,842",
    icon: checkoutIcon,
    percent: "+8.2%",
  },
  {
    title: "Active Users",
    value: "8,921",
    icon: userIcon,
    percent: "-2.4%",
  },
  {
    title: "Monthly Growth",
    value: "24.8%",
    icon: growthIcon,
    percent: "+4.1%",
  },
];

const Reports = ({ darkMode }) => {
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/report/cards");
        const data = await response.json();
        
        if (response.ok) {
          setStats([
            {
              title: "Total Revenue",
              value: data.totalRevenue,
              icon: rightUp,
              percent: "+12.5%",
            },
            {
              title: "Total Orders",
              value: data.totalOrders ? data.totalOrders.toString().padStart(2, "0") : "00",
              icon: checkoutIcon,
              percent: "+8.2%",
            },
            {
              title: "Active Users",
              value: data.activeUsers ? data.activeUsers.toString().padStart(2, "0") : "00",
              icon: userIcon,
              percent: "-2.4%",
            },
            {
              title: "Monthly Growth",
              value: data.monthlyGrowth,
              icon: growthIcon,
              percent: "+4.1%",
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching report cards data:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div
      className={`p-3 sm:p-4 md:p-6 lg:p-8 min-h-screen transition-all duration-300
      ${darkMode ? "bg-[#0f0f0f]" : "bg-[#f5f7fb]"}`}
    >
      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="rounded-3xl p-5 text-white shadow-sm cursor-pointer
            bg-gradient-to-br from-[#c08a61] via-[#a96942] to-[#7a4b2f]
            transition-all duration-300
            hover:-translate-y-2
            hover:shadow-[0_20px_50px_rgba(169,105,66,0.35)]
            hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-6">
              {/* LEFT ICON */}
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <img
                  src={item.icon}
                  alt=""
                  className="w-5 h-5 object-contain"
                />
              </div>

              {/* PERCENT */}
              <div
                className="flex items-center gap-1 text-xs font-semibold
                bg-black text-white px-3 py-1 rounded-full shadow-md"
              >
                <img
                  src={rightUp1}
                  alt=""
                  className="w-3.5 h-3.5 object-contain"
                />
                <span>{item.percent}</span>
              </div>
            </div>

            <p className="text-sm text-white/80">{item.title}</p>

            <h2 className="text-3xl font-bold mt-1">{item.value}</h2>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[1.7fr_0.8fr] gap-5 mt-6">
        {/* LEFT SIDE */}
        <div
          className={`rounded-3xl p-5 md:p-6 shadow-sm border transition-all duration-300 hover:shadow-xl
          ${
            darkMode
              ? "bg-[#161616] border-[#232323]"
              : "bg-white border-[#ececec]"
          }`}
        >
          {/* HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2
                className={`text-xl font-semibold
                ${darkMode ? "text-white" : "text-[#222]"}`}
              >
                Revenue Performance
              </h2>

              <p
                className={`text-sm mt-1
                ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                Monthly growth and order volume analysis
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                className={`h-11 px-4 rounded-xl border flex items-center gap-2 text-sm transition-all duration-300 hover:scale-105
                ${
                  darkMode
                    ? "bg-[#111] border-[#2a2a2a] text-white hover:bg-[#1a1a1a]"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <img
                  src={filterIcon}
                  alt=""
                  className="w-4 h-4 object-contain"
                />
                Filters
              </button>

              <button
                className={`h-11 px-4 rounded-xl border flex items-center gap-2 text-sm transition-all duration-300 hover:scale-105
                ${
                  darkMode
                    ? "bg-[#111] border-[#2a2a2a] text-white hover:bg-[#1a1a1a]"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <img
                  src={downloadIcon}
                  alt=""
                  className="w-4 h-4 object-contain"
                />
                Export
              </button>
            </div>
          </div>

          {/* GRAPH */}
          <div className="mt-8 overflow-x-auto">
            <div className="min-w-[700px] h-[320px] relative pl-12 pb-8">
              {/* Y AXIS */}
              <div
                className={`absolute left-0 top-0 h-full flex flex-col justify-between text-xs
                ${darkMode ? "text-gray-500" : "text-gray-400"}`}
              >
                <span>₹10000</span>
                <span>₹7500</span>
                <span>₹5000</span>
                <span>₹2500</span>
                <span>₹0</span>
              </div>

              {/* GRID */}
              <div className="absolute inset-0 left-12 flex flex-col justify-between">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`border-t border-dashed
                    ${darkMode ? "border-[#2b2b2b]" : "border-[#ececec]"}`}
                  />
                ))}
              </div>

              {/* SVG GRAPH */}
              <svg
                viewBox="0 0 700 320"
                className="absolute inset-0 left-12 w-[calc(100%-48px)] h-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#d9a63d" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#d9a63d" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  d="M20 230 
                  C70 240, 90 250, 130 190
                  C170 130, 210 200, 260 170
                  C320 130, 350 80, 410 110
                  C470 140, 500 50, 570 70
                  C620 80, 650 90, 690 70"
                  fill="none"
                  stroke="#d9a63d"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <path
                  d="M20 230 
                  C70 240, 90 250, 130 190
                  C170 130, 210 200, 260 170
                  C320 130, 350 80, 410 110
                  C470 140, 500 50, 570 70
                  C620 80, 650 90, 690 70
                  L690 320 L20 320 Z"
                  fill="url(#paint0_linear)"
                />
              </svg>

              {/* MONTHS */}
              <div
                className={`absolute bottom-0 left-12 right-0 flex justify-between text-sm
                ${darkMode ? "text-gray-500" : "text-gray-400"}`}
              >
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className={`rounded-3xl p-5 md:p-6 shadow-sm border transition-all duration-300 hover:shadow-xl
          ${
            darkMode
              ? "bg-[#161616] border-[#232323]"
              : "bg-[#edf6fa] border-[#dfeef5]"
          }`}
        >
          <h2
            className={`text-xl font-semibold
            ${darkMode ? "text-white" : "text-[#222]"}`}
          >
            Revenue Mix
          </h2>

          <p
            className={`text-sm mt-1
            ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            Income share by service type
          </p>

          {/* DONUT CHART */}
          <div className="flex justify-center mt-10">
            <div className="relative w-[220px] h-[220px] rounded-full bg-[conic-gradient(#e4a93d_0deg,#e4a93d_150deg,#c15b17_150deg,#c15b17_250deg,#000_250deg,#000_330deg,#e4a93d_330deg)] flex items-center justify-center shadow-lg">
              <div
                className={`w-[120px] h-[120px] rounded-full
                ${darkMode ? "bg-[#161616]" : "bg-[#edf6fa]"}`}
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-10 flex items-center justify-between">
            <p
              className={`text-sm
              ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Total Share
            </p>

            <span className="text-[#d9a63d] font-semibold">100%</span>
          </div>
        </div>
      </div>
      {/* BOTTOM SECTION */}
<div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.6fr] gap-5 mt-6">
  {/* WEEKLY ENGAGEMENT */}
  <div
    className={`rounded-3xl p-5 md:p-6 shadow-sm border transition-all duration-300 hover:shadow-xl
    ${
      darkMode
        ? "bg-[#161616] border-[#232323]"
        : "bg-white border-[#ececec]"
    }`}
  >
    <h2
      className={`text-lg font-semibold
      ${darkMode ? "text-white" : "text-[#222]"}`}
    >
      Weekly Engagement
    </h2>

    <p
      className={`text-sm mt-1
      ${darkMode ? "text-gray-400" : "text-gray-500"}`}
    >
      New user registrations over 4 weeks
    </p>
    <div className="mt-8 flex items-end justify-between gap-4 h-[220px] px-2">
      {[
        { week: "Week 1", height: "h-[120px]" },
        { week: "Week 2", height: "h-[165px]" },
        { week: "Week 3", height: "h-[140px]" },
        { week: "Week 4", height: "h-[190px]" },
      ].map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-end gap-3 flex-1"
        >
          <div
            className={`${item.height} w-full max-w-[42px] rounded-xl bg-gradient-to-t from-[#c07c2b] to-[#e4b04d] shadow-md transition-all duration-300 hover:scale-105`}
          />

          <span
            className={`text-xs whitespace-nowrap
            ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            {item.week}
          </span>
        </div>
      ))}
    </div>
  </div>
  <div
    className={`rounded-3xl p-5 md:p-6 shadow-sm border transition-all duration-300 hover:shadow-xl overflow-hidden
    ${
      darkMode
        ? "bg-[#161616] border-[#232323]"
        : "bg-white border-[#ececec]"
    }`}
  >

    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h2
          className={`text-lg font-semibold
          ${darkMode ? "text-white" : "text-[#222]"}`}
        >
          Recent Reports
        </h2>

        <p
          className={`text-sm mt-1
          ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          Operational ledger for the current period
        </p>
      </div>

      <button className="text-[#d9a63d] text-sm font-medium hover:underline">
        View All
      </button>
    </div>

    {/* TABLE */}
    <div className="mt-6 overflow-x-auto">
      <div className="min-w-[700px]">
        {/* HEAD */}
        <div
          className={`grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr] text-sm font-medium pb-4 border-b
          ${
            darkMode
              ? "border-[#2a2a2a] text-gray-400"
              : "border-[#ececec] text-gray-500"
          }`}
        >
          <span>ID</span>
          <span>Client Name</span>
          <span>Revenue</span>
          <span>Status</span>
          <span className="text-right">Date</span>
        </div>
        {[
          {
            id: "#REP-2041",
            client: "Nexus Corp",
            revenue: "₹12,400.00",
            status: "Paid",
            color: "bg-gray-200 text-gray-700",
            date: "Oct 12, 2023",
          },
          {
            id: "#REP-2042",
            client: "Altos Design",
            revenue: "₹8,250.00",
            status: "Pending",
            color: "bg-yellow-100 text-yellow-700",
            date: "Oct 14, 2023",
          },
          {
            id: "#REP-2043",
            client: "Quantom AI",
            revenue: "₹15,100.00",
            status: "Paid",
            color: "bg-gray-200 text-gray-700",
            date: "Oct 15, 2023",
          },
          {
            id: "#REP-2044",
            client: "GreenLeaf Co",
            revenue: "₹6,800.00",
            status: "Paid",
            color: "bg-gray-200 text-gray-700",
            date: "Oct 17, 2023",
          },
          {
            id: "#REP-2045",
            client: "Starlight Dev",
            revenue: "₹11,200.00",
            status: "Overdue",
            color: "bg-red-100 text-red-600",
            date: "Oct 20, 2023",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr] py-5 text-sm items-center border-b
            ${
              darkMode
                ? "border-[#222] text-gray-300"
                : "border-[#f1f1f1] text-gray-700"
            }`}  >
            <span className="text-[#d9a63d] font-medium">{item.id}</span>

            <span>{item.client}</span>
            <span className="font-medium">{item.revenue}</span>
            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${item.color}`} >
                {item.status}
              </span>
            </div>
            <span className="text-right">{item.date}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p
        className={`text-sm
        ${darkMode ? "text-gray-400" : "text-gray-500"}`}  >
        Showing 5 of 48 reports
      </p>
      <div className="flex items-center gap-2">
        <button
          className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 hover:scale-105
          ${
            darkMode
              ? "bg-[#111] border-[#2a2a2a]"
              : "bg-white border-[#ececec]"
          }`} >
          <img
            src={leftArrow}
            alt=""
            className="w-4 h-4 object-contain"  />
        </button>
        <button className="w-9 h-9 rounded-xl bg-[#c07c2b] text-white text-sm font-medium shadow-md">
          1
        </button>
        <button
          className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-300
          ${
            darkMode
              ? "text-gray-300 hover:bg-[#1e1e1e]"
              : "text-gray-600 hover:bg-gray-100"
          }`}>
          2
        </button>
        <button
          className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-300
          ${
            darkMode
              ? "text-gray-300 hover:bg-[#1e1e1e]"
              : "text-gray-600 hover:bg-gray-100"
          }`} >
          3
        </button>

        <button
          className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 hover:scale-105
          ${
            darkMode
              ? "bg-[#111] border-[#2a2a2a]"
              : "bg-white border-[#ececec]"
          }`}  >
          <img  src={rightArrow}  alt=""
            className="w-4 h-4 object-contain"  />
        </button>
      </div>
     </div>
    </div>
   </div>
    </div>
  );
};

export default Reports;