import { useEffect, useMemo, useState } from "react";
import addIcon from "../assets/add.png";
import searchIcon from "../assets/search.png";
import userIcon from "../assets/user.png";
import a1 from "../assets/a1.jpeg";
import pencilIcon from "../assets/pencil (1).png";
import binIcon from "../assets/bin.png";
import CreateUserForm from "./CreateUserForm";
const Users = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error("Users API failed");
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error(err);
      setError("Users load nahi ho paaye. Backend start karo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial server sync for the users table.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUsers();
  }, []);

  const userStats = useMemo(() => {
    const total = users.length;
    const active = users.filter((user) => user.status === "Active").length;
    const pending = users.filter((user) => user.status === "Pending").length;
    const blocked = users.filter((user) => user.status === "Blocked").length;

    return { total, active, pending, blocked };
  }, [users]);

  const progress = (value) => {
    if (!userStats.total) {
      return "0%";
    }

    return `${Math.round((value / userStats.total) * 100)}%`;
  };

  const cards = [
    {
      title: "Total Users",
      value: userStats.total.toString().padStart(2, "0"),
      progress: "100%",
    },
    {
      title: "Active Users",
      value: userStats.active.toString().padStart(2, "0"),
      progress: progress(userStats.active),
    },
    {
      title: "Pending Users",
      value: userStats.pending.toString().padStart(2, "0"),
      progress: progress(userStats.pending),
    },
    {
      title: "Blocked Users",
      value: userStats.blocked.toString().padStart(2, "0"),
      progress: progress(userStats.blocked),
    },
  ];
  return (
    <div className="min-h-screen bg-[#f8f5ef] p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-8">
        <div>
   <h1 className="text-3xl sm:text-4xl font-bold text-[#5c4033]">
            User Management</h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Manage all users and organization members </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
          <div className="bg-white border border-[#ececec] rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm w-full sm:w-[320px]">
            <img src={searchIcon} alt="" className="w-4 h-4 opacity-70"/>
            <input type="text" placeholder="Search users..."
              className="bg-transparent outline-none w-full text-sm"/>
          </div>
          <button  onClick={() => setShowForm(true)}
            className="bg-[#8b5e3c] hover:bg-[#73492b] text-white font-semibold px-5 py-3 rounded-2xl shadow-md transition-all duration-300 flex items-center justify-center gap-2" >
            <img src={addIcon} alt="" className="w-5 h-5"   />
            Insert User
          </button>
        </div>
      </div>
      {!showForm && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {cards.map((card, index) => (
            <div key={index}
              className="rounded-[30px] p-6 shadow-md border border-[#d8c4b6] bg-gradient-to-br from-[#8b5e3c] to-[#5c4033]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm"> {card.title}</p>
                  <h2 className="text-4xl font-bold text-white mt-4">
                    {card.value}</h2>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <img src={userIcon}  alt=""  className="w-7 h-7" />
                </div>
              </div>
              <div className="mt-6">
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#f5d7b2] rounded-full"style={{ width: card.progress }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showForm && (
        <div className="mb-8">
          <CreateUserForm
            setShowForm={setShowForm}
            onUserCreated={loadUsers}
          />
        </div>
      )}
      {!showForm && (
        <div className="bg-white rounded-[30px] border border-[#ececec] shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b border-[#f2f2f2]">
            <div>
              <h2 className="text-2xl font-bold text-[#5c4033]">
                User Records</h2>
              <p className="text-sm text-gray-500 mt-1">
                Complete list of registered users
              </p>
            </div>
            <button className="bg-[#8b5e3c] hover:bg-[#73492b] text-white px-5 py-3 rounded-2xl font-semibold text-sm transition-all">
              Export Data
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-[#f4ebe4]">
                <tr>
                  <th className="text-left p-5 text-[#5c4033] font-semibold">
                    ID </th>
                  <th className="text-left p-5 text-[#5c4033] font-semibold">
                    User Name </th>
                  <th className="text-left p-5 text-[#5c4033] font-semibold">
                    Email Address
                  </th>
                  <th className="text-left p-5 text-[#5c4033] font-semibold">
                    Department
                  </th>
                  <th className="text-left p-5 text-[#5c4033] font-semibold">
                    Role
                  </th>
                  <th className="text-left p-5 text-[#5c4033] font-semibold">
                    Status </th>
                  <th className="text-left p-5 text-[#5c4033] font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500">
                      Users load ho rahe hain...
                    </td>
                  </tr>
                )}
                {!loading && error && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-red-600">
                      {error}
                    </td>
                  </tr>
                )}
                {!loading && !error && users.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500">
                      Abhi koi user nahi hai.
                    </td>
                  </tr>
                )}
                {users.map((user) => (
                  <tr key={user.id}
                    className="border-b border-[#f4f4f4] hover:bg-[#fcfaf6] transition-all duration-300" >
                    <td className="p-5 text-gray-700 font-medium">
                      #{user.id}</td>
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <img  src={a1}  alt={user.fullName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-[#d6b08c]" />
                        <div>
                          <h3 className="font-semibold text-[#5c4033]"> {user.fullName}</h3>
                          <p className="text-xs text-gray-500"> Organization Member</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-gray-600">{user.email}</td>
                    <td className="p-5 text-gray-600"> {user.department}</td>
                    <td className="p-5">
                      <span className="bg-[#f4ebe4] text-[#6d4c41] px-4 py-1.5 rounded-full text-sm font-semibold">
                        {user.role}  </span> </td>
                    <td className="p-5">
                      <span className={`px-4 py-1.5 rounded-full text-sm font-semibold
                        ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : user.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        } `} >
                        {user.status}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <button className="w-11 h-11 rounded-2xl bg-[#f4ebe4] hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-sm">
                          <img src={pencilIcon} alt="" className="w-5 h-5"/>
                        </button>
                        <button className="w-11 h-11 rounded-2xl bg-red-50 hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-sm">
                          <img src={binIcon}  alt=""  className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
