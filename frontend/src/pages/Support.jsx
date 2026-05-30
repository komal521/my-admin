import { useState, useEffect } from "react";
import bookingIcon from "../assets/booking.png";
import clockIcon from "../assets/clock.png";
import infoIcon from "../assets/information.png";
import checkIcon from "../assets/check-mark.png";
import dotsIcon from "../assets/dots.png";
import downIcon from "../assets/down.png";
import emailIcon from "../assets/email.png";
import messageIcon from "../assets/message.png";
import dateIcon from "../assets/date.png";
import faqIcon from "../assets/faq.png";
import menu1Icon from "../assets/menu1.png";
import rightUp from "../assets/right-up.png";
import a1 from "../assets/a1.jpeg";
import a4 from "../assets/a4.jpeg";
import b1 from "../assets/b1.jpeg";
import b2 from "../assets/b2.jpeg";
import b4 from "../assets/b4.jpeg";
const profileImages = [a1, a4, b1, b2, b4];
const Support = ({ darkMode }) => {
  const [data, setData] = useState({
    totalTickets: 0,
    openTickets: 0,
    pendingIssues: 0,
    resolvedToday: 0,
    totalTicketsGrowth: "0%",
    openTicketsGrowth: "0%",
    pendingIssuesGrowth: "0%",
    resolvedTodayGrowth: "0%",
  });
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    const fetchSupportData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/support/cards");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching support data:", error);
      }
    };
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/support/tickets");
        const result = await response.json();
        setTickets(result);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchSupportData();
    fetchTickets();
  }, []);
  const cards = [
    {
      title: "TOTAL TICKETS",
      value: data.totalTickets.toLocaleString(),
      growth: data.totalTicketsGrowth,
      icon: bookingIcon,
    },
    {
      title: "OPEN TICKETS",
      value: data.openTickets.toLocaleString(),
      growth: data.openTicketsGrowth,
      icon: clockIcon,
    },
    {
      title: "PENDING ISSUES",
      value: data.pendingIssues.toLocaleString(),
      growth: data.pendingIssuesGrowth,
      icon: infoIcon,
    },
    {
      title: "RESOLVED TODAY",
      value: data.resolvedToday.toLocaleString(),
      growth: data.resolvedTodayGrowth,
      icon: checkIcon,
    },
  ];

  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-50 text-red-500 border border-red-100";
      case "medium":
        return "bg-gray-50 text-gray-700 border border-gray-200";
      case "low":
        return "bg-gray-50 text-gray-500 border border-gray-200";
      default:
        return "bg-gray-50 text-gray-500 border border-gray-200";
    }
  };

  const internalSupportItems = [
    { title: "Priority Email Support", desc: "vip-desk@luxeadmin.com", icon: emailIcon },
    { title: "Live Internal Chat", desc: "Est. wait: 2 mins", icon: messageIcon },
    { title: "Schedule Consultation", desc: "With Senior Architect", icon: dateIcon },
    { title: "Working Hours", desc: "Mon-Fri, 9AM-8PM EST", icon: faqIcon },
  ];

  const faqs = [
    { question: "How do I reset an admin password?", answer: "Navigate to Settings > Security and click on 'Reset Password'. You will receive a secure link via your registered admin email.", expanded: true },
    { question: "What is the average response time?", answer: "", expanded: false },
    { question: "Can I export ticket logs to CSV?", answer: "", expanded: false },
    { question: "How are priority levels assigned?", answer: "", expanded: false },
  ];

  return (
    <div className={`p-4 sm:p-6 lg:p-8 min-h-screen ${darkMode ? "bg-gray-900" : "bg-[#fcfbf9]"}`}>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
          Support
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-2xl p-6 relative overflow-hidden shadow-sm transition-transform hover:-translate-y-1"
            style={{
              background: "linear-gradient(to bottom, #f5ece1 0%, #b87333 100%)",
            }}
          >
            <div className="flex justify-between items-start mb-8">
              <div className="w-11 h-11 bg-[#1a1a1a] rounded-xl flex items-center justify-center shadow-md">
                <img
                  src={card.icon}
                  alt={card.title}
                  className="w-5 h-5 object-contain filter invert brightness-0"
                />
              </div>
              <div className="bg-[#8b4d16] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider shadow-sm">
                Live
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-black tracking-widest mb-1 opacity-80">
                {card.title}
              </p>
              <h2 className="text-3xl font-bold text-black mb-3">
                {card.value}
              </h2>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-white">
                <img src={rightUp} alt="" className="w-3.5 h-3.5 object-contain" />
                <span>{card.growth} from yesterday</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left Side: Recent Support Tickets */}
        <div className="lg:col-span-8 space-y-6">
          <div className={`rounded-3xl p-6 shadow-sm border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                  Recent Support Tickets
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Monitor and respond to active customer inquiries.
                </p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button className={`px-4 py-2 rounded-xl text-sm font-semibold border ${darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                  Filter
                </button>
                <button className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#a67c52] text-white hover:bg-[#8b6540] transition-colors shadow-sm">
                  Export CSV
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-3 px-2 text-[10px] font-bold text-gray-500 tracking-wider uppercase">ID</th>
                    <th className="py-3 px-2 text-[10px] font-bold text-gray-500 tracking-wider uppercase">USER</th>
                    <th className="py-3 px-2 text-[10px] font-bold text-gray-500 tracking-wider uppercase">SUBJECT</th>
                    <th className="py-3 px-2 text-[10px] font-bold text-gray-500 tracking-wider uppercase">PRIORITY</th>
                    <th className="py-3 px-2 text-[10px] font-bold text-gray-500 tracking-wider uppercase">STATUS</th>
                    <th className="py-3 px-2 text-[10px] font-bold text-gray-500 tracking-wider uppercase text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.length > 0 ? (
                    tickets.map((ticket, index) => (
                      <tr key={ticket.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-2 text-xs font-bold text-gray-800">
                          #TK-4{ticket.id.toString().padStart(3, '0')}
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-3">
                            <img src={profileImages[index % profileImages.length]} alt="" className="w-8 h-8 rounded-full object-cover shadow-sm" />
                            <span className="text-sm font-semibold text-gray-800">{ticket.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-sm text-gray-600 truncate max-w-[200px]">
                          {ticket.subject || "General Inquiry"}
                        </td>
                        <td className="py-4 px-2">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${getPriorityStyle(ticket.priority || 'Medium')}`}>
                            {ticket.priority || 'Medium'}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-sm font-semibold text-gray-800">
                          {ticket.status}
                        </td>
                        <td className="py-4 px-2 text-right">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <img src={dotsIcon} alt="actions" className="w-4 h-4 object-contain opacity-50" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-sm text-gray-500">
                        No recent tickets found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button className="text-sm font-bold text-[#8b4d16] hover:text-[#a67c52] transition-colors">
                View All {data.totalTickets.toLocaleString()} Tickets
              </button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div>
            <div className="flex justify-between items-end mb-4">
              <h2 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                Global FAQs
              </h2>
              <span className="text-xs text-gray-500 font-semibold cursor-pointer hover:text-gray-700">Update Center</span>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-gray-800">{faq.question}</h3>
                    <img src={downIcon} alt="expand" className={`w-3 h-3 object-contain transition-transform ${faq.expanded ? "rotate-180" : ""}`} />
                  </div>
                  {faq.expanded && (
                    <p className="mt-3 text-xs text-gray-500 leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
              Internal Support
            </h2>
            <div className="space-y-3">
              {internalSupportItems.map((item, idx) => (
                <div key={idx} className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#d9a63d]">
                      <img src={item.icon} alt={item.title} className="w-5 h-5 object-contain" style={{ filter: "invert(63%) sepia(51%) saturate(542%) hue-rotate(345deg) brightness(90%) contrast(92%)" }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <span className="text-gray-300 font-bold text-lg">›</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-6 text-center shadow-md relative overflow-hidden"
               style={{ background: "linear-gradient(to bottom, #fdf4eb 0%, #e0a96d 100%)" }}>
            <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <img src={menu1Icon} alt="platinum" className="w-6 h-6 object-contain" style={{ filter: "invert(58%) sepia(56%) saturate(624%) hue-rotate(345deg) brightness(98%) contrast(93%)" }} />
            </div>
            <h3 className="text-sm font-bold text-[#8b4d16] mb-2">Platinum Tier Support</h3>
            <p className="text-xs text-[#8b4d16] opacity-80 leading-relaxed px-2">
              Your account is currently under our white-glove internal management service.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Support;
