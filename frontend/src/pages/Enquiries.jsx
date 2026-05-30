import { useState, useEffect } from "react";
import searchIcon from "../assets/search.png";
import downloadIcon from "../assets/download.png";
import addIcon from "../assets/add.png";
import filterIcon from "../assets/filter.png";
import rightUpIcon from "../assets/right-up.png";
import dateIcon from "../assets/date.png";
import moreIcon from "../assets/more (1).png";
import boxIcon from "../assets/box.png";
import clockIcon from "../assets/clock.png";
import checkIcon from "../assets/check-mark.png";
import informationIcon from "../assets/information.png";
import a1 from "../assets/a1.jpeg";
import a4 from "../assets/a4.jpeg";
import b2 from "../assets/b2.jpeg";
import b3 from "../assets/b3.jpeg";
import b4 from "../assets/b4.jpeg";
import gmailIcon from "../assets/gmail.png";
import phoneIcon from "../assets/telephone (1).png";
import messageIcon from "../assets/message.png";
import fileIcon from "../assets/file (1).png";
import userIcon from "../assets/user.png";
import sendIcon from "../assets/send.png";
const Enquiries = ({ darkMode }) => {
  const defaultCards = [
    {
      title: "TOTAL ENQUIRIES",
      value: "1,284",
      growth: "+12.5%",
      icon: boxIcon,
    bg: "from-[#b9926d] to-[#8b6a45]",
      iconBg: "bg-white",
      growthColor: "text-[#1d1d1d]",
    },
    {
      title: "PENDING",
      value: "42",
      growth: "-2.4%",
      icon: clockIcon,
     bg: "from-[#b9926d] to-[#8b6a45]",
      iconBg: "bg-white",
      growthColor: "text-red-500",
    },
    {
      title: "RESOLVED TODAY",
      value: "18",
      growth: "+5.2%",
      icon: checkIcon,
     bg: "from-[#b9926d] to-[#8b6a45]",
      iconBg: "bg-white",
      growthColor: "text-[#1d1d1d]",
    },
    {
      title: "HIGH PRIORITY",
      value: "09",
      growth: "+1.8%",
      icon: informationIcon,
     bg: "from-[#b9926d] to-[#8b6a45]",
      iconBg: "bg-white",
      growthColor: "text-[#1d1d1d]",
    },
  ];
  const [cards, setCards] = useState(defaultCards);
  useEffect(() => {
    const fetchEnquiryCards = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/enquiry/cards");
        const data = await response.json();  
        if (response.ok) {
          setCards([
            {
              title: "TOTAL ENQUIRIES",
              value: data.totalEnquiries.toString().padStart(2, "0"),
              growth: "+12.5%",
              icon: boxIcon,
              bg: "from-[#C8A25A] to-[#8B6A45]",
              iconBg: "bg-[#1b1b1b]",
              growthColor: "text-[#1d1d1d]",
            },
            {
              title: "PENDING",
              value: data.pendingEnquiries.toString().padStart(2, "0"),
              growth: "-2.4%",
              icon: clockIcon,
              bg: "from-[#f8eee4] to-[#d58a43]",
              iconBg: "bg-white",
              growthColor: "text-red-500",
            },
            {
              title: "RESOLVED TODAY",
              value: data.resolvedToday.toString().padStart(2, "0"),
              growth: "+5.2%",
              icon: checkIcon,
              bg: "from-[#f8eee4] to-[#d58a43]",
              iconBg: "bg-white",
              growthColor: "text-[#1d1d1d]",
            },
            {
              title: "HIGH PRIORITY",
              value: data.highPriority.toString().padStart(2, "0"),
              growth: "+1.8%",
              icon: informationIcon,
              bg: "from-[#f8eee4] to-[#d58a43]",
              iconBg: "bg-white",
              growthColor: "text-[#1d1d1d]",
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching enquiry cards:", error);
      }
    };
    fetchEnquiryCards();
  }, []);
  const enquiries = [
    {
      img: a1,
      name: "Eleanor Vance",
      email: "eleanor.v@design.com",
      phone: "+1 (555) 012-3456",
      subject: "Product Customization Query",
      priority: "High",
      status: "Pending",
      date: "24 Oct 2023",
    },
    {
      img: a4,
      name: "Marcus Sterling",
      email: "m.sterling@luxury.co",
      phone: "+1 (555) 987-6543",
      subject: "Bulk Order Discount Request",
      priority: "Medium",
      status: "In Progress",
      date: "24 Oct 2023",
    },
    {
      img: b2,
      name: "Sophia Chen",
      email: "sophia.chen@artistry.io",
      phone: "+1 (555) 246-1357",
      subject: "Shipping Delay Investigation",
      priority: "High",
      status: "Pending",
      date: "23 Oct 2023",
    },
    {
      img: b3,
      name: "Julian Rossi",
      email: "j.rossi@italy-dev.com",
      phone: "+1 (555) 369-2580",
      subject: "Wholesale Partnership Inquiry",
      priority: "Low",
      status: "Resolved",
      date: "22 Oct 2023",
    },
    {
      img: b4,
      name: "Isabella Knight",
      email: "i.knight@boutique.net",
      phone: "+1 (555) 741-8520",
      subject: "Refund Status Update",
      priority: "Medium",
      status: "Pending",
      date: "22 Oct 2023",
    },
  ];
  const getPriorityStyle = (priority) => {
    if (priority === "High") return "bg-red-100 text-red-500";
    if (priority === "Medium") return "bg-yellow-100 text-yellow-600";
    return "bg-gray-100 text-gray-500";
  };
  const getStatusStyle = (status) => {
    if (status === "Pending") return "bg-gray-100 text-gray-600";
    if (status === "In Progress") return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-600";
  };
   const [activeBtn, setActiveBtn] = useState("filter");
   const [activeActionBtn, setActiveActionBtn] = useState("reply");
   const [activePage, setActivePage] = useState(1);
  return (
    <div className="p-4 md:p-7">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
        <div>
          <h1
            className={`text-3xl md:text-4xl font-bold ${
              darkMode ? "text-white" : "text-[#1a1a1a]"
            }`}>
            Customer Enquiries
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Manage and respond to all incoming client enquiries across
            platforms.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div
            className={`flex items-center gap-3 px-4 h-[52px]
            rounded-full border min-w-[260px]
            ${
              darkMode
                ? "bg-[#1e1e1e] border-[#2c2c2c]"
                : "bg-white border-[#ececec]"
            }`} >
            <img src={searchIcon} alt="" className="w-4 h-4" />
            <input type="text" placeholder="Search enquiries..."
              className={`bg-transparent outline-none text-sm w-full ${
                darkMode ? "text-white" : "text-black"
              }`} />
          </div>
  <button onClick={() => setActiveBtn("filter")}
    className={`h-[52px] px-5 rounded-full border flex items-center gap-2 text-sm font-medium transition-all duration-300
    ${
      activeBtn === "filter"
        ? "bg-[#c8a25a] text-white border-[#c8a25a]"
        : darkMode
        ? "bg-[#1e1e1e] border-[#2c2c2c] text-white"
        : "bg-white border-[#ececec] text-[#222]"
    }`}>
    <img src={filterIcon} alt="" className={`w-4 h-4 ${
        activeBtn === "filter" ? "brightness-0 invert" : ""
      }`} />
    Filter
  </button>
  <button  onClick={() => setActiveBtn("export")}
    className={`h-[52px] px-5 rounded-full border shadow-sm flex items-center gap-2 text-sm font-medium transition-all duration-300
    ${
      activeBtn === "export"
        ? "bg-[#c8a25a] text-white border-[#c8a25a]"
        : darkMode
        ? "bg-[#1e1e1e] border-[#2c2c2c] text-white"
        : "bg-white border-[#ececec] text-[#222]"
    }`} >
    <img  src={downloadIcon}  alt=""  className={`w-4 h-4 ${
        activeBtn === "export" ? "brightness-0 invert" : ""
      }`}/>
    Export
  </button>
  <button  onClick={() => setActiveBtn("add")}
    className={`h-[52px] px-6 rounded-full flex items-center gap-2 text-sm font-semibold transition-all duration-300 border
    ${
      activeBtn === "add"
        ? "bg-[#c8a25a] text-white border-[#c8a25a]"
        : darkMode
        ? "bg-[#1e1e1e] border-[#2c2c2c] text-white"
        : "bg-white border-[#ececec] text-[#222]"
    }`} >
    <img  src={addIcon}  alt=""  className={`w-4 h-4 ${
        activeBtn === "add" ? "brightness-0 invert" : ""
      }`}/>
    Add Enquiry
  </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`bg-gradient-to-b ${card.bg} rounded-[28px] p-5 min-h-[165px]`}  >
            <div className="flex items-start justify-between">
              <div
                className={`w-14 h-14 rounded-full ${card.iconBg} flex items-center justify-center shadow-sm`} >
                <img src={card.icon} alt="" className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1">
                <img src={rightUpIcon} alt="" className="w-3 h-3" />
                <span
                  className={`text-sm font-semibold ${card.growthColor}`} >
                  {card.growth}
                </span>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-[11px] tracking-[2px] font-semibold text-[#4a311d]">
                {card.title}
              </p>
              <h2 className="text-[40px] leading-none font-bold mt-3 text-[#1a1a1a]">
                {card.value}
              </h2>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 2xl:grid-cols-[1fr_360px] gap-6 mt-8">
        <div
          className={`rounded-3xl p-4 md:p-6 border overflow-hidden
        ${
          darkMode
            ? "bg-[#1e1e1e] border-[#2c2c2c]"
            : "bg-white border-[#ececec]"
        }`} >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div
              className={`flex items-center gap-3 px-4 h-[48px]
            rounded-full border w-full md:w-[320px]
            ${
              darkMode
                ? "bg-[#252525] border-[#333]"
                : "bg-[#fafafa] border-[#ececec]"
            }`} >
              <img src={searchIcon} alt="" className="w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email..."
                className="bg-transparent outline-none text-sm w-full" />
            </div>
            <div className="flex gap-3 flex-wrap">
              <button className="h-[48px] px-5 rounded-full border flex items-center gap-2">
                <img src={filterIcon} alt="" className="w-4 h-4" />
                Filters
              </button>
              <button className="h-[48px] px-5 rounded-full border flex items-center gap-2">
                <img src={dateIcon} alt="" className="w-4 h-4" />
                Last 30 Days
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b">
                  <th className="py-4">CUSTOMER</th>
                  <th>PHONE NUMBER</th>
                  <th>SUBJECT</th>
                  <th>PRIORITY</th>
                  <th>STATUS</th>
                  <th>DATE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((item, index) => (
                  <tr key={index} className="border-b last:border-none">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.img}
                          alt=""
                          className="w-11 h-11 rounded-full object-cover" />
                        <div>
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-500">
                            {item.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm">{item.phone}</td>
                    <td className="text-sm">{item.subject}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${getPriorityStyle(
                          item.priority
                        )}`} >
                        {item.priority}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(
                          item.status
                        )}`} >
                        {item.status}
                      </span>
                    </td>
                    <td className="text-sm">{item.date}</td>
                    <td>
                      <button>
                        <img src={moreIcon} alt="" className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
            <p className="text-sm text-gray-500">
              Showing 5 of 1,284 results
            </p>
            <div className="flex items-center gap-2">
              <button
    onClick={() => activePage > 1 && setActivePage(activePage - 1)}
    className={`px-4 py-2 border rounded-full text-sm transition-all duration-300
    ${
      darkMode
        ? "bg-[#1e1e1e] border-[#2c2c2c] text-white"
        : "bg-white border-[#ececec] text-[#222]"
    }`} >
    Previous
  </button>
  <button
    onClick={() => setActivePage(1)}
    className={`w-9 h-9 rounded-full border text-sm transition-all duration-300
    ${
      activePage === 1
        ? "bg-[#c8a25a] border-[#c8a25a] text-white"
        : darkMode
        ? "bg-[#1e1e1e] border-[#2c2c2c] text-white"
        : "bg-white border-[#ececec] text-[#222]"
    }`} >
    1
  </button>
  <button  onClick={() => setActivePage(2)}
    className={`w-9 h-9 rounded-full border text-sm transition-all duration-300
    ${
      activePage === 2
        ? "bg-[#c8a25a] border-[#c8a25a] text-white"
        : darkMode
        ? "bg-[#1e1e1e] border-[#2c2c2c] text-white"
        : "bg-white border-[#ececec] text-[#222]"
    }`}  >
    2
  </button>
  <button  onClick={() => setActivePage(3)}
    className={`w-9 h-9 rounded-full border text-sm transition-all duration-300
    ${
      activePage === 3
        ? "bg-[#c8a25a] border-[#c8a25a] text-white"
        : darkMode
        ? "bg-[#1e1e1e] border-[#2c2c2c] text-white"
        : "bg-white border-[#ececec] text-[#222]"
    }`} >
    3
  </button>
  <button
    onClick={() => activePage < 3 && setActivePage(activePage + 1)}
    className={`px-4 py-2 border rounded-full text-sm transition-all duration-300
    ${
      darkMode
        ? "bg-[#1e1e1e] border-[#2c2c2c] text-white"
        : "bg-white border-[#ececec] text-[#222]"
    }`}  >
    Next
  </button>
            </div>
          </div>
        </div>
        <div
          className={`rounded-[30px] p-5 border h-fit sticky top-5
          ${
            darkMode
              ? "bg-[#1e1e1e] border-[#2c2c2c] text-white"
              : "bg-[#f8f5f0] border-[#ececec] text-[#1a1a1a]"
          }`} >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold">Enquiry Preview</h2>
              <p className="text-xs text-gray-500 mt-1">
                REF: ESO-1104
              </p>
            </div>
            <span className="text-[10px] px-3 py-1 rounded-full bg-green-100 text-green-600 font-medium">
              RESOLVED
            </span>
          </div>
          <div className="mt-5 bg-[#ebe7e1] rounded-[24px] p-5 text-center">
            <img
              src={b2}
              alt=""
              className="w-20 h-20 rounded-full object-cover mx-auto" />
            <h3 className="font-bold text-lg mt-3">Julian Rossi</h3>
            <p className="text-xs text-gray-500">
              CEO @ Italy Dev Group
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <img src={gmailIcon} alt="" className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <img src={phoneIcon} alt="" className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <img src={messageIcon} alt="" className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-[11px] tracking-[2px] text-gray-500 font-semibold">
              SUBJECT
            </p>
            <h3 className="font-semibold mt-2 leading-6">
              Wholesale Partnership Inquiry for European Market Expansion
            </h3>
          </div>
          <div className="mt-5 bg-[#d6b98b] rounded-[24px] p-5">
            <p className="text-sm leading-7 text-[#5d4023]">
              "Dear Team, we are interested in wholesale distribution &
              potential long-term strategic partnership for our distribution
              expansion."
            </p>
            <button className="mt-4 text-sm font-medium ">
              View Message 
            </button>
          </div>
          <div className="mt-6">
            <h4 className="text-[11px] tracking-[2px] text-gray-500 font-semibold">
              ATTACHMENTS (2)
            </h4>
            <div className="mt-4 space-y-3">
              <div className="bg-white rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#f6f2eb] flex items-center justify-center">
                    <img src={fileIcon} alt="" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-black">
                      company_profile_2024.pdf
                    </h4>
                    <p className="text-xs text-gray-500">
                      2.4 MB
                    </p>
                  </div>
                </div>
                <button>
                  <img src={downloadIcon} alt="" className="w-5 h-5"  />
                </button>
              </div>
              <div className="bg-white rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#f6f2eb] flex items-center justify-center">
                    <img src={fileIcon} alt="" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-black">
                      wholesale_proposal.xlsx
                    </h4>
                    <p className="text-xs text-gray-500">
                      1.8 MB
                    </p>
                  </div>
                </div>
                <button>
                  <img src={downloadIcon} alt="" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-7">
            <h4 className="text-[11px] tracking-[2px] text-gray-500 font-semibold">
              ACTIVITY TIMELINE
            </h4>
            <div className="mt-5 space-y-5">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#efe4d3] flex items-center justify-center">
                  <img src={gmailIcon} alt="" className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold">
                    Enquiry Received
                  </h5>
                  <p className="text-xs text-gray-500 mt-1">
                    Oct 22, 2023 at 10:45 AM
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#efe4d3] flex items-center justify-center">
                  <img src={userIcon} alt="" className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold">
                    Assigned to Sarah M.
                  </h5>
                  <p className="text-xs text-gray-500 mt-1">
                    Customer Success Manager
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#efe4d3] flex items-center justify-center">
                  <img src={clockIcon} alt="" className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold">
                    Marked as Resolved
                  </h5>
                  <p className="text-xs text-gray-500 mt-1">
                    Oct 23, 2023 at 9:30 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-7">
           <button
    onClick={() => setActiveActionBtn("resolved")}
    className={`flex-1 h-[48px] rounded-full border text-sm font-medium transition-all duration-300 flex items-center justify-center
    ${
      activeActionBtn === "resolved"
        ? "bg-[#c8a25a] text-white border-[#c8a25a]"
        : darkMode
        ? "bg-[#1e1e1e] border-[#2c2c2c] text-white"
        : "bg-white border-[#d7c5a4] text-[#222]"
    }`} >
    Mark Resolved
  </button>
  <button
    onClick={() => setActiveActionBtn("reply")}
    className={`flex-1 h-[48px] rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 border
    ${
      activeActionBtn === "reply"
        ? "bg-[#8b6a45] text-white border-[#8b6a45]"
        : darkMode
        ? "bg-[#1e1e1e] border-[#2c2c2c] text-white"
        : "bg-white border-[#ececec] text-[#222]"
    }`} >
    <img  src={sendIcon}  alt=""
      className={`w-4 h-4 ${
        activeActionBtn === "reply" ? "brightness-0 invert" : ""
      }`}  />
    Reply
  </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enquiries;