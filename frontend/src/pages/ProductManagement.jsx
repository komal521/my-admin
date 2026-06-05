import { useEffect, useState } from "react";
import uploadIcon from "../assets/upload.png";
import searchIcon from "../assets/search.png";
import filterIcon from "../assets/filter.png";
import boxIcon from "../assets/box.png";
import checkIcon from "../assets/check-mark.png";
import clockIcon from "../assets/clock.png";
import informationIcon from "../assets/information.png";
import g1 from "../assets/ga.webp";
import g2 from "../assets/g2.webp";
import g3 from "../assets/g3.jpg";
import g4 from "../assets/g4.jpg";
import g5 from "../assets/g5.webp";
import showIcon from "../assets/show.png";
import pencilIcon from "../assets/pencil (1).png";
import binIcon from "../assets/bin (1).png";
import addIcon from "../assets/add.png";
import AddProduct from "./AddProduct";
const ProductManagement = ({ darkMode }) => {
  const [activePage, setActivePage] = useState(1);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [dbProducts, setDbProducts] = useState([]);
  const [cards, setCards] = useState([]);
  const loadCards = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/product/cards");

      if (!response.ok) {
        throw new Error("Cards API failed");
      }

      const data = await response.json();

      setCards([
        {
          title: "Total Products",
          value: data.totalProducts,
          growth: "+12%",
          icon: boxIcon,
        },
        {
          title: "Active Products",
          value: data.activeProducts,
          growth: "+5.4%",
          icon: checkIcon,
        },
        {
          title: "Low Stock",
          value: data.lowStockProducts,
          growth: "+2.1%",
          icon: clockIcon,
        },
        {
          title: "Out of Stock",
          value: data.outOfStockProducts,
          growth: "+0.5%",
          icon: informationIcon,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  const products = [
    {
      image: g1,
      name: "Aura Quartz Watch",
      sku: "AQ-W-20-G",
      category: "Accessories",
      brand: "Aura Premium",
      price: "₹299.00",
      stock: 124,
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      image: g2,
      name: "Sonic Over-Ear Headphones",
      sku: "SH-50-BK",
      category: "Electronics",
      brand: "AudioTech",
      price: "₹159.50",
      stock: 45,
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      image: g3,
      name: "Crimson Sprint Sneakers",
      sku: "CS-V2-RE",
      category: "Footwear",
      brand: "SprintMax",
      price: "₹89.00",
      stock: 0,
      status: "Out of Stock",
      statusColor: "bg-red-100 text-red-600",
    },
    {
      image: g4,
      name: "Polarized Retro Shades",
      sku: "PR-SH-77",
      category: "Accessories",
      brand: "Luna Eye",
      price: "₹120.00",
      stock: 12,
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      image: g5,
      name: "Minimalist Glass Kettle",
      sku: "MK-01-CL",
      category: "Home & Kitchen",
      brand: "PureBrew",
      price: "₹45.99",
      stock: 8,
      status: "Draft",
      statusColor: "bg-gray-200 text-gray-600",
    },
  ];
  const loadProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");

      if (!response.ok) {
        throw new Error("Products API failed");
      }

      const data = await response.json();
      const mappedProducts = (data.products || []).map((product) => ({
        raw: product,
        image: product.image ? `http://localhost:5000/uploads/${product.image}` : g1,
        name: product.product_name,
        sku: product.sku,
        category: product.category,
        brand: product.brand,
        price: `₹${Number(product.base_price || 0).toFixed(2)}`,
        stock: product.stock_quantity,
        status: product.is_active ? "Active" : "Draft",
        statusColor: product.is_active
          ? "bg-green-100 text-green-700"
          : "bg-gray-200 text-gray-600",
      }));

      setDbProducts(mappedProducts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
    loadCards();
  }, []);

  const visibleProducts = dbProducts.length > 0 ? dbProducts : products;
  if (showAddProduct || editingProduct) {
    return (
      <AddProduct
        key={editingProduct ? editingProduct.id : "new"}
        darkMode={darkMode}
        product={editingProduct}
        onBack={() => {
          setShowAddProduct(false);
          setEditingProduct(null);
          loadProducts();
        }}
      />
    );
  }

  return (
    <div
      className={`min-h-screen p-4 sm:p-5 md:p-7 ${darkMode ? "bg-[#0f172a]" : "bg-[#f4f7fb]"}`}>
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-7">
        <div>
          <h1 className={`text-3xl md:text-4xl font-bold ${darkMode ? "text-white" : "text-[#1a1a1a]"}`} >
            Product Management
          </h1>
          <p className={`mt-1 text-sm md:text-base ${darkMode ? "text-gray-400" : "text-gray-500"}`} >
            Refine and organize your master luxury catalog for Q4.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowAddProduct(true)}
            className="px-7 py-3 rounded-3xl bg-gradient-to-r from-[#d4af37] to-[#b8860b]
  hover:opacity-90 text-white text-sm font-semibold shadow-lg
  transition-all duration-300 hover:scale-[1.03]"
          >
            Insert
          </button>
          <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border min-w-[240px]
            ${darkMode
              ? "bg-[#1a2234] border-[#2b3548]"
              : "bg-white border-gray-200"}`} >
            <img src={searchIcon} alt="" className="w-4 h-4 opacity-70" />
            <input type="text" placeholder="Search products..."
              className={`bg-transparent outline-none text-sm w-full
              ${darkMode
                  ? "text-white placeholder:text-gray-400"
                  : "text-gray-700 placeholder:text-gray-400"}`} />
          </div>
          <button
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl border text-sm font-medium transition-all duration-300 hover:scale-[1.03]
            ${darkMode
                ? "bg-[#1a2234] border-[#2b3548] text-white hover:bg-[#d4a373]"
                : "bg-white border-gray-200 text-gray-700 hover:bg-[#d4a373] hover:text-white"}`} >
            <img src={uploadIcon} alt="" className="w-4 h-4" />
            Import
          </button>
          <button
            onClick={() => setShowAddProduct(true)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#b8860b] hover:opacity-90 text-white text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-[1.03]">
            Add Product
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
        {cards.map((card, index) => (
          <div key={index}
            className="bg-[#b98952] rounded-3xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300" >
            <div className="flex items-start justify-between mb-8">
              <div className="w-14 h-14 rounded-2xl bg-[#1d2433] flex items-center justify-center shadow-md">
                <img src={card.icon} alt=""
                  className="w-6 h-6 brightness-0 invert" />
              </div>
              <span className="text-sm font-semibold text-[#1f1f1f]">
                {card.growth}
              </span>
            </div>
            <h3 className="text-[#2f2f2f] text-base font-medium">
              {card.title}
            </h3>
            <p className="text-4xl font-bold text-[#111] mt-2">
              {card.value}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 2xl:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          <div className={`rounded-3xl overflow-hidden border
            ${darkMode
              ? "bg-[#111827] border-[#1f2937]"
              : "bg-white border-gray-200"}`} >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-5 bg-[#f5ecd2]">
              <div>
                <h2 className="text-lg font-bold text-[#1f1f1f]">
                  Product Catalog
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your inventory and product listings.
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all">
                <img src={filterIcon} alt="" className="w-4 h-4" />
                Filters
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px]">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    <th className="px-6 py-4">
                      <input type="checkbox" />
                    </th>
                    <th className="px-4 py-4 text-sm text-gray-500 font-semibold">
                      Image
                    </th>
                    <th className="px-4 py-4 text-sm text-gray-500 font-semibold">
                      Product Name
                    </th>
                    <th className="px-4 py-4 text-sm text-gray-500 font-semibold">
                      SKU ID
                    </th>
                    <th className="px-4 py-4 text-sm text-gray-500 font-semibold">
                      Category
                    </th>
                    <th className="px-4 py-4 text-sm text-gray-500 font-semibold">
                      Brand
                    </th>
                    <th className="px-4 py-4 text-sm text-gray-500 font-semibold">
                      Price
                    </th>
                    <th className="px-4 py-4 text-sm text-gray-500 font-semibold">
                      Stock
                    </th>
                    <th className="px-4 py-4 text-sm text-gray-500 font-semibold">
                      Status
                    </th>
                    <th className="px-4 py-4 text-sm text-gray-500 font-semibold">
                      Manage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visibleProducts.map((product, index) => (
                    <tr key={index}
                      className="border-b border-gray-100 hover:bg-[#faf7ef] transition-all" >
                      <td className="px-6 py-5">
                        <input type="checkbox" />
                      </td>
                      <td className="px-4 py-5">
                        <img src={product.image} alt=""
                          className="w-14 h-14 rounded-2xl object-cover border border-gray-200" />
                      </td>
                      <td className="px-4 py-5">
                        <h3 className="text-sm font-semibold text-[#1f1f1f]">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          Added 2023-10-12
                        </p>
                      </td>
                      <td className="px-4 py-5 text-sm text-gray-600">
                        {product.sku}
                      </td>
                      <td className="px-4 py-5">
                        <span className="px-3 py-1 rounded-full text-xs bg-[#f3f4f6] text-gray-600">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-sm text-gray-700 font-medium">
                        {product.brand}
                      </td>
                      <td className="px-4 py-5 text-sm font-semibold text-[#1f1f1f]">
                        {product.price}
                      </td>
                      <td
                        className={`px-4 py-5 text-sm font-semibold ${product.stock === 0
                            ? "text-red-500"
                            : "text-gray-700"}`} >
                        {product.stock}
                      </td>
                      <td className="px-4 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${product.statusColor}`} >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-4">
                          <button className="hover:scale-110 transition-all">
                            <img src={showIcon} alt="" className="w-4 h-4 opacity-70" />
                          </button>
                          <button className="hover:scale-110 transition-all" onClick={() => { if (product.raw) setEditingProduct(product.raw); else alert('Static products cannot be edited'); }}>
                            <img src={pencilIcon} alt="" className="w-4 h-4 opacity-70" />
                          </button>
                          <button className="hover:scale-110 transition-all">
                            <img src={binIcon} alt="" className="w-4 h-4 opacity-70" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-5">
              <p className="text-sm text-gray-500">
                Showing 1 to {visibleProducts.length} of {visibleProducts.length} entries
              </p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-100">
                  Previous
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    onClick={() => setActivePage(page)}
                    className={`w-9 h-9 rounded-full text-sm font-medium transition-all
                    ${activePage === page
                        ? "bg-[#d4af37] text-white"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-[#f5ecd2]"
                      }`} >
                    {page}
                  </button>
                ))}
                <button className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-100">
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-[#E7C45A] rounded-[16px] px-5 py-4 shadow-sm relative overflow-hidden h-[95px]">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#b8860b33] flex items-center justify-center">
                  <img src={boxIcon} alt="" className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-[#3b2a08]">
                    Warehouse A
                  </h3>
                  <p className="text-[11px] text-[#6b5a2b] mt-[1px]">
                    Main Distribution
                  </p>
                </div>
              </div>
              <div className="absolute bottom-4 left-5 right-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-[#5c4b1f] font-medium">
                    Storage Capacity
                  </span>
                  <span className="text-[11px] text-[#5c4b1f] font-semibold">
                    84%
                  </span>
                </div>
                <div className="w-full h-[4px] bg-[#e6d3a1] rounded-full overflow-hidden">
                  <div className="w-[84%] h-full bg-[#8A2BE2] rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="bg-[#E7C45A] rounded-[16px] px-5 py-4 shadow-sm relative overflow-hidden h-[95px]">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#b8860b33] flex items-center justify-center">
                  <img src={boxIcon} alt="" className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-[#3b2a08]">
                    Warehouse B
                  </h3>
                  <p className="text-[11px] text-[#6b5a2b] mt-[1px]">
                    Seasonal Overflow
                  </p>
                </div>
              </div>
              <div className="absolute bottom-4 left-5 right-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-[#5c4b1f] font-medium">
                    Storage Capacity
                  </span>
                  <span className="text-[11px] text-[#5c4b1f] font-semibold">
                    72%
                  </span>
                </div>
                <div className="w-full h-[4px] bg-[#e6d3a1] rounded-full overflow-hidden">
                  <div className="w-[72%] h-full bg-[#8A2BE2] rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="bg-[#E7C45A] rounded-[16px] px-5 py-4 shadow-sm relative overflow-hidden h-[95px]">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#b8860b33] flex items-center justify-center">
                  <img src={clockIcon} alt="" className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-[#3b2a08]">
                    Processing
                  </h3>
                  <p className="text-[11px] text-[#6b5a2b] mt-[1px]">
                    Inbound Shipments
                  </p>
                </div>
              </div>
              <div className="absolute bottom-4 left-5 right-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-[#5c4b1f] font-medium">
                    Target ETA
                  </span>
                  <span className="text-[11px] text-[#5c4b1f] font-semibold">
                    12h 40m
                  </span>
                </div>
                <div className="w-full h-[4px] bg-[#e6d3a1] rounded-full overflow-hidden">
                  <div className="w-[78%] h-full bg-[#8A2BE2] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="bg-white rounded-[28px] p-5 shadow-sm border border-[#ececec]">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-bold text-[#2b2b2b] uppercase tracking-wide">
                Recent Additions
              </h2>
              <button className="text-[#7b61ff] text-xs font-semibold hover:underline">
                View All
              </button>
            </div>
            {[
              {
                name: "Velvet Sofa Cover",
                price: "₹24.00",
                time: "2 min ago",
              },
              {
                name: "Titanium Wallet",
                price: "₹85.00",
                time: "45 mins ago",
              },
              {
                name: "Bamboo Desk Lamp",
                price: "₹62.00",
                time: "7 hours ago",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b last:border-none" >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f4efff] flex items-center justify-center">
                    <img src={addIcon} alt="" className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#2f2f2f]">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[12px] font-bold text-[#ff7a00]">
                        {item.price}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        • {item.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-[28px] p-5 shadow-sm border border-[#ececec]">
            <h2 className="text-sm font-bold text-[#2b2b2b] uppercase tracking-wide mb-5">
              TOP CATEGORIES
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {["Electronics", "Apparel", "Home", "Health"].map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-[#f4f5f8] rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:shadow-md transition-all duration-300" >
                    <div className="w-10 h-10 rounded-full bg-[#1f2430] flex items-center justify-center mb-3">
                      <img src={boxIcon} alt="" className="w-4 h-4 brightness-0 invert" />
                    </div>
                    <h3 className="text-sm font-semibold text-[#2f2f2f]">
                      {item}
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-1">
                      142 Items
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="bg-white rounded-[28px] p-5 shadow-sm border border-[#ececec]">
            <h2 className="text-sm font-bold text-[#2b2b2b] mb-5">
              Top Performance
            </h2>
            {[
              {
                name: "Leather Satchel",
                sold: "1204 Units Sold",
                price: "₹45,750",
                rank: "#1",
              },

              {
                name: "Silk Sleep Mask",
                sold: "840 Units Sold",
                price: "₹12,400",
                rank: "#2",
              },

              {
                name: "Copper Pan Set",
                sold: "745 Units Sold",
                price: "₹89,400",
                rank: "#3",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b last:border-none" >
                <div>
                  <h3 className="text-sm font-semibold text-[#2b2b2b]">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1">
                    {item.sold}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-[#7b61ff] font-bold">
                    {item.rank}
                  </p>
                  <p className="text-sm font-bold text-[#7b61ff] mt-1">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-b from-[#f0c54d] to-[#ff8c3a] rounded-[28px] p-5 shadow-md">
            <h2 className="text-lg font-bold text-[#3d2d00]">
              Premium Export
            </h2>
            <p className="text-[12px] text-[#5e4700] leading-6 mt-2">
              Upgrade your plan to unlock automated PDF reporting and
              inventory forecasting.
            </p>
            <button className="mt-5 w-full bg-[#1f2430] hover:bg-black transition-all text-white py-3 rounded-2xl text-sm font-semibold">
              Unlock Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductManagement;
