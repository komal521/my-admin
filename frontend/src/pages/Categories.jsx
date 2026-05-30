import { useState, useEffect } from "react";
import filterIcon from "../assets/filter.png";
import addIcon from "../assets/add.png";
import cateIcon from "../assets/cate.png";
import clockIcon from "../assets/clock.png";
import rightUpIcon from "../assets/right-up.png";
import viewIcon from "../assets/view.png";
import dotsIcon from "../assets/dots.png";
import downloadIcon from "../assets/download.png";
import packageIcon from "../assets/package.png";
import uploadIcon from "../assets/upload.png";
import informationIcon from "../assets/information.png";
import smartHomeIcon from "../assets/cat-smart-home.svg";
import premiumAudioIcon from "../assets/cat-premium-audio.svg";
import wearableTechIcon from "../assets/cat-wearable-tech.svg";
import officeIcon from "../assets/cat-minimal-office.svg";
import legacyIcon from "../assets/cat-legacy-component.svg";
import ecoLivingIcon from "../assets/cat-eco-living.svg";
import c1 from "../assets/c1.jpg";
import c2 from "../assets/c2.jpg";
import c3 from "../assets/c3.jpg";
import AddCategory from "./AddCategory";

const Categories = ({ darkMode }) => {
  const [activeButton, setActiveButton] = useState("add");

  const defaultCards = [
    { title: "Total Categories", value: "48", percent: "+12%", icon: cateIcon },
    { title: "Active Categories", value: "36", percent: "+4%", icon: clockIcon },
    { title: "Trending Now", value: "08", percent: "+25%", icon: rightUpIcon },
    { title: "Hidden Items", value: "04", percent: "-2%", icon: viewIcon },
  ];
  const [cards, setCards] = useState(defaultCards);
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState("");
  const performance = [
    { label: "Electronics", value: "82%", width: "82%" },
    { label: "Audio Gear", value: "64%", width: "64%" },
    { label: "Home Decor", value: "45%", width: "45%" },
  ];

  const quickActions = [
    { label: "Export Catalog", icon: downloadIcon },
    { label: "Reorder Display", icon: packageIcon },
    { label: "Bulk Archive", icon: uploadIcon },
  ];

  const changes = [
    {
      image: c1,
      title: "Sarah Chen updated Smart Home visibility",
      time: "12 mins ago",
    },
    {
      image: c2,
      title: "Marcus Wright created Premium Audio category",
      time: "45 mins ago",
    },
    {
      image: c3,
      title: "Elena Rossi added 12 items from Eco Living",
      time: "1 hour ago",
    },
  ];
const [showAddPage, setShowAddPage] = useState(false);
useEffect(() => {
  fetchCategories();
  fetchCardsData();
}, []);

const fetchCardsData = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/categories/cards");
    const data = await res.json();
    if (res.ok) {
      const totalCategories = Number(data.totalCategories || 0);
      const activeCategories = Number(data.activeCategories || 0);
      const trendingNow = Number(data.trendingNow || 0);
      const hiddenItems = Number(data.hiddenItems || 0);

      setCards([
        { title: "Total Categories", value: totalCategories.toString().padStart(2, "0"), percent: "+12%", icon: cateIcon },
        { title: "Active Categories", value: activeCategories.toString().padStart(2, "0"), percent: "+4%", icon: clockIcon },
        { title: "Trending Now", value: trendingNow.toString().padStart(2, "0"), percent: "+25%", icon: rightUpIcon },
        { title: "Hidden Items", value: hiddenItems.toString().padStart(2, "0"), percent: "-2%", icon: viewIcon },
      ]);
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchCategories = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/categories");
    const data = await res.json();

    if (!res.ok) {
      setCategories([]);
      setCategoryError(data.message || "Categories load nahi ho paayi.");
      return;
    }

    setCategories(Array.isArray(data) ? data : []);
    setCategoryError(Array.isArray(data) ? "" : "Categories ka data format galat aa raha hai.");
  } catch (error) {
    console.log(error);
    setCategories([]);
    setCategoryError("Backend se connection nahi ho pa raha.");
  }
};
if (showAddPage) {
  return <AddCategory darkMode={darkMode} />;
}
  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8">
      <div
        className={`rounded-3xl p-4 shadow-sm sm:p-6 ${
          darkMode ? "bg-[rgb(27,27,27)]" : "bg-[#f8f8f8]"
        }`}
      >
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1
              className={`text-2xl font-bold sm:text-3xl ${
                darkMode ? "text-white" : "text-[#1b1b1b]"
              }`}
            >
              Category Management
            </h1>
            <p
              className={`mt-1 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Manage and organize your product catalog structures efficiently.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
            <div
              className={`flex h-[48px] min-w-full items-center rounded-2xl px-4 sm:min-w-[260px] ${
                darkMode
                  ? "border border-[#222] bg-[#111]"
                  : "border border-gray-200 bg-white"
              }`}
            >
              <input
                type="text"
                placeholder="Search categories..."
                className={`flex-1 bg-transparent text-sm outline-none ${
                  darkMode ? "text-white" : "text-black"
                }`}
              />
            </div>

            <button
              onClick={() => setActiveButton("filter")}
              className={`flex h-[48px] items-center justify-center gap-2 rounded-2xl px-5 text-sm font-medium transition-all duration-300 ${
                activeButton === "filter"
                  ? "bg-[#111111] text-white"
                  : darkMode
                  ? "bg-white text-black"
                  : "border border-gray-200 bg-white text-black"
              }`}
            >
              <img
                src={filterIcon}
                alt=""
                className={`h-4 w-4 ${
                  activeButton === "filter" ? "brightness-0 invert" : ""
                }`}
              />
              Filter
            </button>
            <button onClick={() => {
    setActiveButton("add");
    setShowAddPage(true); }}
  className={`flex h-[48px] items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition-all duration-300 ${
    activeButton === "add"
      ? "bg-[#111111] text-white"
      : "border border-gray-200 bg-white text-black"
  }`}>
  <img src={addIcon} alt="" className={`h-4 w-4 ${
      activeButton === "add" ? "brightness-0 invert" : ""
    }`}  />
  Add Category
</button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#c29a73] via-[#a97b52] to-[#7a5337] p-5 shadow-md transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute right-4 top-4 rounded-full bg-white px-2 py-[2px] text-[11px] font-semibold text-gray-700">
                {card.percent}
              </div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#111111]">
                <img src={card.icon} alt="" className="h-5 w-5 brightness-0 invert" />
              </div>
              <p className="text-sm text-white/80">{card.title}</p>
              <h2 className="mt-1 text-4xl font-bold text-white">{card.value}</h2>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_300px]">
          <div className="rounded-[26px] bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#1f2937]">
                  Primary Categories
                </h2>
                <p className="text-xs text-gray-400">
                  Image, category info, item stats, status and creation date.
                </p>
              </div>
              <span className="text-xs text-gray-400">
                Showing all {categories.length} entries
              </span>
            </div>
<div className="hidden md:grid w-full grid-cols-[70px_170px_70px_90px_100px_30px] justify-between border-b border-gray-100 px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-gray-400 items-center">
              <span>Image</span>
              <span>Category Info</span>
              <span>Stats</span>
              <span>Status</span>
              <span>Created At</span>
              <span />
            </div>

            <div className="space-y-3">
              {categoryError && (
                <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-4 text-sm font-semibold text-red-700">
                  {categoryError}
                </div>
              )}

              {!categoryError && categories.length === 0 && (
                <div className="rounded-2xl border border-gray-100 bg-[#fcfbf7] px-4 py-8 text-center text-sm font-semibold text-gray-500">
                  Abhi koi category add nahi hui hai.
                </div>
              )}

              {categories.map((item) => (
                <div
                 key={item.id || item.category_name}
                className="w-full grid grid-cols-1 md:grid-cols-[70px_170px_70px_90px_100px_30px] justify-between gap-x-2 rounded-2xl border border-gray-100 bg-[#fcfbf7] px-4 py-3 shadow-sm md:items-center"
                >
                  <img
                   src={item.image
    ? `http://localhost:5000/uploads/${item.image}`
    : "https://via.placeholder.com/80"} 
                    alt={item.category_name || "Category"}
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                <div className="min-w-0 flex flex-col"> 
  <h3 className="font-bold text-[#1f2937] truncate"> {item.category_name || "Untitled category"}</h3>
                   <p className="mt-1 text-xs text-gray-400 truncate"> {item.slug || "No slug"}</p>
                  </div>
                 <div className="flex flex-col">
            <p className="font-bold text-[#1f2937]">{item.stats || "0"}</p>
                    <p className="text-xs text-gray-400">Products</p>
                  </div>
                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                      item.status === "Active"
                        ? "bg-[#c6eadf] text-[#138368]"
                        : item.status === "Trending"
                        ? "bg-[#ffc83d] text-[#754a00]"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {item.status}
                  </span>
                  <p className="text-sm text-gray-400">
                    {item.created_at ? new Date(item.created_at).toLocaleDateString() : "-"}
                  </p>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100">
                    <img src={dotsIcon} alt="" className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <button className="mt-4 w-full rounded-2xl border border-[#1f2937] py-3 text-sm font-semibold text-[#1f2937] transition-all hover:bg-[#1f2937] hover:text-white">
              Load more categories
            </button>
          </div>

          <div className="space-y-5">
            <div className="rounded-[24px] bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <img src={rightUpIcon} alt="" className="h-4 w-4" />
                <h2 className="font-bold text-[#1f2937]">Performance</h2>
              </div>
              <div className="space-y-4">
                {performance.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-semibold text-gray-600">{item.label}</span>
                      <span className="font-bold text-[#9b5f00]">{item.value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#f0e4d4]">
                      <div
                        className="h-full rounded-full bg-[#bb7700]"
                        style={{ width: item.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] bg-white p-5 shadow-sm">
              <h2 className="mb-4 font-bold text-[#1f2937]">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((item) => (
                  <button
                    key={item.label}
                    className="flex w-full items-center justify-between rounded-2xl border border-gray-100 px-4 py-3 text-sm font-semibold text-[#1f2937] hover:bg-[#f8f4ea]"
                  >
                    <span className="flex items-center gap-3">
                      <img src={item.icon} alt="" className="h-4 w-4" />
                      {item.label}
                    </span>
                    <span>{">"}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] bg-gradient-to-b from-[#ffb340] to-[#fff64d] p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <img src={informationIcon} alt="" className="h-4 w-4" />
                <h2 className="font-bold text-[#3b2600]">Recent Changes</h2>
              </div>
              <div className="space-y-4">
                {changes.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <img
                      src={item.image}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-bold leading-5 text-[#3b2600]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-[#875b00]">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
