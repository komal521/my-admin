import searchIcon from "../assets/search.png";
import filterIcon from "../assets/filter.png";
import downloadIcon from "../assets/download.png";
import addIcon from "../assets/add.png";
import boxIcon from "../assets/box.png";
import clockIcon from "../assets/clock.png";
import checkIcon from "../assets/check-mark.png";
import closeIcon from "../assets/close.png";
import undoIcon from "../assets/undo.png";
import carIcon from "../assets/car.png";
import b1 from "../assets/b1.jpeg";
import b2 from "../assets/b2.jpeg";
import b3 from "../assets/b3.jpeg";
import b4 from "../assets/b4.jpeg";
import b5 from "../assets/b5.jpeg";
import c1 from "../assets/c1.jpg";
import c2 from "../assets/c2.jpg";
import c3 from "../assets/c3.jpg";
import c4 from "../assets/c4.jpg";
import c5 from "../assets/c5.jpg";
import moreIcon from "../assets/more.png";
import leftArrowIcon from "../assets/left-arrow.png";
import rightArrowIcon from "../assets/right-arrow.png";
import rightUp from "../assets/right-up.png";
import axios from "axios";
import { useEffect, useState } from "react";
const OrderManagement = ({ darkMode }) => {
  const [activeBtn, setActiveBtn] = useState("add");
  const [cards, setCards] = useState([
    {
      title: "Total Orders",
      value: "0",
      growth: " 14.2% vs last month",
      icon: boxIcon,
    },
    {
      title: "Pending Orders",
      value: "0",
      growth: " 2.4% vs last month",
      icon: clockIcon,
    },
    {
      title: "Completed Orders",
      value: "0",
      growth: " 8.1% vs last month",
      icon: checkIcon,
    },
    {
      title: "Cancelled Orders",
      value: "0",
      growth: " 1.2% vs last month",
      icon: closeIcon,
    },
  ]);
  const orders = [
    {
      id: "#ORD-8921",
      customer: "Sarah Jenkins",
      image: b1,
      product: "Ergonomic Chair",
      date: "Oct 24, 2023",
      payment: "Mastercard",
      status: "Delivered",
      amount: "₹249.00",
      statusColor:
        "bg-[#eaf8ef] text-[#1f9d57] border border-[#d1f0dc]",
    },
    {
      id: "#ORD-8922",
      customer: "Marcus Thorne",
      image: b2,
      product: "Wireless Headphones",
      date: "Oct 24, 2023",
      payment: "PayPal",
      status: "Pending",
      amount: "₹129.99",
      statusColor:
        "bg-[#fff6df] text-[#d9a100] border border-[#f8e7b3]",
    },
    {
      id: "#ORD-8923",
      customer: "Elena Rodriguez",
      image: b3,
      product: "Smart Watch S3",
      date: "Oct 23, 2023",
      payment: "Visa",
      status: "Processing",
      amount: "₹399.00",
      statusColor:
        "bg-[#eef2ff] text-[#4f6df5] border border-[#d9e2ff]",
    },
    {
      id: "#ORD-8924",
      customer: "David Kim",
      image: b4,
      product: "Mechanical Keyboard",
      date: "Oct 23, 2023",
      payment: "Apple Pay",
      status: "Cancelled",
      amount: "₹159.00",
      statusColor:
        "bg-[#ffe8e8] text-[#ef4444] border border-[#ffd0d0]",
    },
    {
      id: "#ORD-8925",
      customer: "Lisa Wong",
      image: b5,
      product: '4K Monitor 27"',
      date: "Oct 22, 2023",
      payment: "Visa",
      status: "Delivered",
      amount: "₹549.50",
      statusColor:
        "bg-[#eaf8ef] text-[#1f9d57] border border-[#d1f0dc]",
    },
  ];
  const activities = [
    {
      name: "Emma Watson",
      text: "placed a new order for Ergonomic Chair",
      time: "2 minutes ago",
      img: c1,
    },
    {
      name: "James Miller",
      text: "updated shipping address for #ORD-8921",
      time: "15 minutes ago",
      img: c2,
    },
    {
      name: "Sophia Grey",
      text: "requested a refund for Wireless Headphones",
      time: "45 minutes ago",
      img: c3,
    },
    {
      name: "Liam Chen",
      text: "cancelled order #ORD-8904",
      time: "1 hour ago",
      img: c4,
    },
    {
      name: "Olivia Bloom",
      text: "marked #ORD-8910 as delivered",
      time: "3 hours ago",
      img: c5,
    },
  ];
  const quickActions = [
    {
      title: "New Order",
      desc: "Manually create a sale",
      icon: addIcon,
    },
    {
      title: "Download Report",
      desc: "Export sales to Excel",
      icon: downloadIcon,
    },
    {
      title: "Manage Returns",
      desc: "Process refunds & swaps",
      icon: undoIcon,
    },
    {
      title: "Track Shipment",
      desc: "Live courier updates",
      icon: carIcon,
    },
  ];
  const [activePage, setActivePage] = useState(1);
  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/order/cards"
      );

      console.log(res.data);

      setCards([
        {
          title: "Total Orders",
          value: res.data.totalOrders,
          growth: "↑ 14.2% vs last month",
          icon: boxIcon,
        },
        {
          title: "Pending Orders",
          value: res.data.pendingOrders,
          growth: "↓ 2.4% vs last month",
          icon: clockIcon,
        },
        {
          title: "Completed Orders",
          value: res.data.completedOrders,
          growth: "↑ 8.1% vs last month",
          icon: checkIcon,
        },
        {
          title: "Cancelled Orders",
          value: res.data.cancelledOrders,
          growth: "↓ 1.2% vs last month",
          icon: closeIcon,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`min-h-screen p-3 md:p-5 transition-all duration-300 ${darkMode ? "bg-[#111827]" : "bg-[#f8f6f2]"
      }`} >
      <div className="grid grid-cols-1 2xl:grid-cols-[1fr_320px] gap-5">
        <div>
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
            <div>
              <h1
                className={`text-[34px] font-bold ${darkMode ? "text-white" : "text-[#111827]"
                  }`} >
                Order Management
              </h1>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-[#6b7280]"}`}  >
                Manage and track your customer orders efficiently.
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-3">
              <div
                className={`h-[54px] px-5 rounded-full flex items-center gap-3 min-w-full lg:min-w-[340px] ${darkMode
                    ? "bg-[#1c1c1c] border border-[#2a2a2a]"
                    : "bg-[#f1f1f1]"
                  }`} >
                <img src={searchIcon} alt="" className="w-4 h-4 opacity-60" />
                <input type="text"
                  placeholder="Search orders, customers, IDs..."
                  className={`bg-transparent outline-none flex-1 text-sm ${darkMode
                      ? "text-white placeholder:text-gray-500"
                      : "text-[#222]"}`} />
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setActiveBtn("filter")}
                  className={`h-[54px] px-5 rounded-full flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${activeBtn === "filter"
                      ? "bg-[#111827] text-white"
                      : darkMode
                        ? "bg-[#1c1c1c] text-white border border-[#2a2a2a]"
                        : "bg-white text-[#222] border border-[#ececec]"}`}>
                  <img src={filterIcon} alt="" className={`w-4 h-4 $   activeBtn === "filter"
                        ? "brightness-0 invert"
                        : "opacity-70"
                    }`} />
                  Filter
                </button>
                <button onClick={() => setActiveBtn("export")}
                  className={`h-[54px] px-5 rounded-full flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${activeBtn === "export"
                      ? "bg-[#111827] text-white"
                      : darkMode
                        ? "bg-[#1c1c1c] text-white border border-[#2a2a2a]"
                        : "bg-white text-[#222] border border-[#ececec]"
                    }`}  >
                  <img src={downloadIcon} alt=""
                    className={`w-4 h-4 ${activeBtn === "export"
                        ? "brightness-0 invert"
                        : "opacity-70"
                      }`} />
                  Export
                </button>
                <button onClick={() => setActiveBtn("add")}
                  className={`h-[54px] px-6 rounded-full flex items-center gap-2 text-sm font-semibold shadow-lg transition-all duration-300 ${activeBtn === "add"
                      ? "bg-[#d7a53f] text-[#111]"
                      : darkMode
                        ? "bg-[#1c1c1c] text-white border border-[#2a2a2a]"
                        : "bg-white text-[#222] border border-[#ececec]"}`}>
                  <img src={addIcon} alt=""
                    className="w-4 h-4 object-contain" />
                  Add Order
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-7">
            {cards.map((item, index) => (
              <div key={index}
                className="rounded-[26px] p-6 border border-[#d7b77a] bg-gradient-to-br from-[#cfa56c] via-[#a97545] to-[#6f4a2d] shadow-md" >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[13px] uppercase tracking-[1px] text-white/80 font-medium">
                      {item.title}
                    </p>
                    <h2 className="text-[38px] font-bold text-white mt-3 leading-none">
                      {item.value}
                    </h2>
                    <div className="flex items-center gap-1 mt-4">
                      <img
                        src={rightUp}
                        alt=""
                        className={`w-3.5 h-3.5 object-contain ${
                          item.growth.includes("↓") ? "rotate-90" : ""
                        }`}
                      />
                      <p
                        className={`text-xs font-medium ${
                          item.growth.includes("↓")
                            ? "text-[#ffe0e0]"
                            : "text-[#d8ffd7]"
                        }`} >
                        {item.growth.replace("↑", "").replace("↓", "").trim()}
                      </p>
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-white/90 flex items-center justify-center shadow-lg">
                    <img
                      src={item.icon}
                      alt=""
                      className="w-6 h-6 object-contain" />
                  </div>
                </div>
              </div>
            ))}
          </div> <div
            className={`mt-7 rounded-[28px] overflow-hidden border ${darkMode
                ? "bg-[#1b1b1b] border-[#2a2a2a]"
                : "bg-[#fcfbf8] border-[#ece7df]"
              }`}>
            <div className="px-6 py-5 flex items-center justify-between bg-[#f5f1ea]">
              <div>
                <h2 className="text-lg font-bold text-[#222]">
                  Recent Orders
                </h2>
                <p className="text-sm mt-1 text-[#666]">
                  Viewing latest 5 of 12,482 total orders
                </p>
              </div>
              <button className="text-sm font-semibold text-[#111]">
                View All Transactions
              </button>
            </div>
            <div className="overflow-x-auto bg-[#fcfbf8]">
              <table className="w-full min-w-[950px]">
                <thead className="border-y border-[#ece7df] bg-[#f8f6f2]">
                  <tr>
                    {[
                      "ORDER ID",
                      "CUSTOMER",
                      "PRODUCT",
                      "DATE",
                      "PAYMENT",
                      "STATUS",
                      "AMOUNT",
                      "ACTIONS",
                    ].map((head, index) => (
                      <th
                        key={index}
                        className="px-6 py-4 text-left text-[11px] tracking-[1px] font-bold text-[#888]" >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#ece7df] hover:bg-[#f8f6f2] transition-all duration-300" >
                      <td className="px-6 py-5">
                        <span className="text-[#3556e8] text-sm font-bold">
                          {item.id}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt=""
                            className="w-10 h-10 rounded-full object-cover" />
                          <span className="font-semibold text-sm text-[#222]">
                            {item.customer}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-[#333]">
                        {item.product}
                      </td>
                      <td className="px-6 py-5 text-sm text-[#666]">
                        {item.date}
                      </td>
                      <td className="px-6 py-5 text-sm text-[#444]">
                        {item.payment}
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold ${item.statusColor}`} >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-bold text-[#222]">
                        {item.amount}
                      </td>
                      <td className="px-6 py-5">
                        <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200/30">
                          <img src={moreIcon} alt="" className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#fcfbf8]">
              <p className="text-sm text-[#666]">
                Showing 1 to 5 of 12,482 entries
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => setActivePage((prev) => (prev > 1 ? prev - 1 : 1))}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-[#f3f3f3] hover:bg-[#e7e7e7] transition-all duration-300">
                  <img src={leftArrowIcon} alt="" className="w-4 h-4" />
                </button>
                {[1, 2, 3].map((page) => (
                  <button key={page} onClick={() => setActivePage(page)}
                    className={`w-9 h-9 rounded-full text-sm font-semibold transition-all duration-300 ${activePage === page
                        ? "bg-[#d4a84f] text-white shadow-md"
                        : "bg-[#f3f3f3] text-[#222] hover:bg-[#ececec]"}`}>
                    {page}
                  </button>
                ))}
                <button onClick={() =>
                  setActivePage((prev) => (prev < 3 ? prev + 1 : 3))}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-[#f3f3f3] hover:bg-[#e7e7e7] transition-all duration-300" >
                  <img src={rightArrowIcon} alt="" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-7">
            {quickActions.map((item, index) => (
              <div key={index}
                className="rounded-[24px] p-5 border flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 bg-[#c7e9d1] border-[#b8dcc3]" >
                <div className="w-12 h-12 rounded-full bg-[#b7a8ff] flex items-center justify-center">
                  <img src={item.icon} alt="" className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[15px] text-[#222]">
                    {item.title}
                  </h3>
                  <p className="text-xs mt-1 text-[#5f6a64]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="rounded-[28px] p-5 border bg-[#fcfbf8] border-[#ececec]">
            <div>
              <h2 className="text-[22px] font-bold text-[#222]">
                Recent Activity
              </h2>
              <p className="text-sm mt-1 text-[#666]">
                Real-time updates across all channels
              </p>
            </div>
            <div className="mt-6 space-y-5">
              {activities.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <img src={item.img} alt=""
                    className="w-11 h-11 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="text-sm leading-[20px] text-[#444]">
                      <span className="font-bold text-[#222]">
                        {item.name}
                      </span>{" "}
                      {item.text}
                    </p>
                    <span className="text-xs mt-1 inline-block text-[#999]">
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] bg-gradient-to-r from-[#c7a4ff] to-[#8c6cf8] p-5 text-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-[1px]">
                PERFORMANCE
              </span>
              <span className="text-[10px] px-2 py-1 rounded-full bg-[#5f45d8]">
                PRO
              </span>
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-90">
                  Monthly Target
                </span>
                <span className="font-bold">85%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/20 mt-3 overflow-hidden">
                <div className="w-[85%] h-full bg-white rounded-full"></div>
              </div>
              <p className="text-xs opacity-80 leading-[18px] mt-4">
                You're only 15% away from reaching your quarterly goal.
                Keep it up.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderManagement;
