const express = require("express");
const cors = require("cors");
const db = require("./db");
const path = require("path");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require ("./routes/categoryRoutes");
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/products", productRoutes);
app.use("/api/categories",categoryRoutes);
app.get("/", (req, res) => {
  res.send("Admin Backend Running");
});
app.get("/api/users", async (req, res) => {
  try {
    const [users] = await db.query(`
      SELECT
        id,
        full_name AS fullName,
        username,
        email,
        phone,
        gender,
        dob
      FROM users
      ORDER BY id DESC
    `);
    const formattedUsers = users.map((user) => ({
      ...user,
      role: "User",
      department: "General",
      status: "Active",
    }));
    res.json({
      users: formattedUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error Loading Users",
    });
  }
});
app.get("/api/dashboard/cards", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT COUNT(*) AS totalUsers FROM users"
    );
    res.json({
      totalUsers: rows[0].totalUsers,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Dashboard Error",
    });
  }
});
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM products WHERE id = ?",
      [id]
    );
    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
});
const ensureTablesExist = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        address TEXT,
        items TEXT,
        total_amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) `);
    await db.query(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(255),
        message TEXT,
        status VARCHAR(50) DEFAULT 'Pending',
        priority VARCHAR(20) DEFAULT 'Medium',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
  } catch (err) {
    console.error("Error ensuring tables exist:", err);
  }
};
app.get("/api/activities", async (req, res) => {
  try {
    await ensureTablesExist();
    const [orders] = await db.query("SELECT id, customer_name, items, created_at FROM orders ORDER BY id DESC LIMIT 5");
    const [users] = await db.query("SELECT id, full_name, created_at FROM users ORDER BY id DESC LIMIT 5");
    const [enquiries] = await db.query("SELECT id, full_name, subject, created_at FROM enquiries ORDER BY id DESC LIMIT 5");
    const [categories] = await db.query("SELECT id, category_name, created_at FROM categories ORDER BY id DESC LIMIT 5");
    const activities = [];
    orders.forEach(o => {
      activities.push({
        name: o.customer_name,
        text: `placed a new order #${o.id} for ${o.items || "Products"}`,
        time: o.created_at,
        type: "order"
      });
    });
    users.forEach(u => {
      activities.push({
        name: u.full_name,
        text: `registered as a new organization member`,
        time: u.created_at,
        type: "user"
      });
    });
    enquiries.forEach(e => {
      activities.push({
        name: e.full_name,
        text: `submitted support ticket regarding: ${e.subject || "General Inquiry"}`,
        time: e.created_at,
        type: "support"
      });
    });
    categories.forEach(c => {
      activities.push({
        name: "Admin",
        text: `created a new category: ${c.category_name}`,
        time: c.created_at,
        type: "category"
      });
    });
    activities.sort((a, b) => new Date(b.time) - new Date(a.time));
    const getRelativeTime = (dateStr) => {
      const diffMs = new Date() - new Date(dateStr);
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);
      if (diffMins < 1) return "just now";
      if (diffMins < 60) return `${diffMins} mins ago`;
      if (diffHours < 24) return `${diffHours} hours ago`;
      return `${diffDays} days ago`;
    };
    const formattedActivities = activities.slice(0, 5).map(act => ({
      name: act.name,
      text: act.text,
      time: getRelativeTime(act.time),
    }));
    res.json(formattedActivities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching activities" });
  }
});
app.get("/api/orders", async (req, res) => {
  try {
    await ensureTablesExist();
    const [orders] = await db.query("SELECT * FROM orders ORDER BY id DESC");
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
});
app.post("/api/orders", async (req, res) => {
  try {
    await ensureTablesExist();
    const { customer_name, email, phone, address, items, total_amount, status } = req.body;
    const [result] = await db.query(
      "INSERT INTO orders (customer_name, email, phone, address, items, total_amount, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [customer_name, email, phone || "", address || "", items || "Products", total_amount || 0, status || "Pending"]
    );
    res.status(201).json({ success: true, message: "Order placed successfully", orderId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to place order" });
  }
});
app.put("/api/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { customer_name, email, phone, address, items, total_amount, status } = req.body;
    await db.query(
      "UPDATE orders SET customer_name = ?, email = ?, phone = ?, address = ?, items = ?, total_amount = ?, status = ? WHERE id = ?",
      [customer_name, email, phone, address, items, total_amount, status, id]
    );
    res.json({ success: true, message: "Order updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update order" });
  }
});
app.delete("/api/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM orders WHERE id = ?", [id]);
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete order" });
  }
});
app.get("/api/order/cards", async (req, res) => {
  try {
    await ensureTablesExist();
    const [results] = await db.query(`
      SELECT 
        COUNT(*) as totalOrders,
        SUM(CASE WHEN status = 'Pending' OR status IS NULL THEN 1 ELSE 0 END) as pendingOrders,
        SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completedOrders,
        SUM(CASE WHEN status = 'Cancelled' THEN 1 ELSE 0 END) as cancelledOrders
      FROM orders
    `);
    const data = results[0] || { totalOrders: 0, pendingOrders: 0, completedOrders: 0, cancelledOrders: 0 };
    res.json({
      totalOrders: data.totalOrders || 0,
      pendingOrders: data.pendingOrders || 0,
      completedOrders: data.completedOrders || 0,
      cancelledOrders: data.cancelledOrders || 0
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Order cards fetch failed" });
  }
});
app.get("/api/support/tickets", async (req, res) => {
  try {
    await ensureTablesExist();
    const [results] = await db.query("SELECT * FROM enquiries ORDER BY id DESC LIMIT 10");
    const tickets = results.map(e => ({
      id: e.id,
      name: e.full_name || "Unknown",
      subject: e.subject || "General Inquiry",
      priority: e.priority || "Medium",
      status: e.status || "Pending",
      email: e.email,
      phone: e.phone,
      message: e.message,
      created_at: e.created_at
    }));
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch tickets" });
  }
});
app.get("/api/support/cards", async (req, res) => {
  try {
    await ensureTablesExist();
    const today = new Date().toISOString().slice(0, 10);
    const [results] = await db.query(`
      SELECT
        COUNT(*) as totalTickets,
        SUM(CASE WHEN status = 'Pending' OR status = 'Open' THEN 1 ELSE 0 END) as openTickets,
        SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as pendingIssues,
        SUM(CASE WHEN status = 'Resolved' AND DATE(created_at) = ? THEN 1 ELSE 0 END) as resolvedToday
      FROM enquiries
    `, [today]);
    const d = results[0] || { totalTickets: 0, openTickets: 0, pendingIssues: 0, resolvedToday: 0 };
    res.json({
      totalTickets: d.totalTickets || 0,
      openTickets: d.openTickets || 0,
      pendingIssues: d.pendingIssues || 0,
      resolvedToday: d.resolvedToday || 0,
      totalTicketsGrowth: "+5%",
      openTicketsGrowth: "+2%",
      pendingIssuesGrowth: "+0%",
      resolvedTodayGrowth: "+10%"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Support cards fetch failed" });
  }
});
app.put("/api/enquiries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority, subject, message } = req.body;
    await db.query(
      "UPDATE enquiries SET status = ?, priority = ?, subject = ?, message = ? WHERE id = ?",
      [status, priority, subject, message, id]
    );
    res.json({ success: true, message: "Ticket updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update ticket" });
  }});

app.delete("/api/enquiries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM enquiries WHERE id = ?", [id]);
    res.json({ success: true, message: "Ticket deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete ticket" });
  }
});
app.post("/api/users/create-user", async (req, res) => {
  try {
    const { fullName, username, email, phone, gender, dob, password, department, role, status, address } = req.body;
    const [result] = await db.query(
      "INSERT INTO users (full_name, username, email, phone, gender, dob, password, department, role, status, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [fullName, username || email, email, phone, gender || "Male", dob || "2000-01-01", password || "123456", department || "General", role || "User", status || "Active", address || ""]
    );
    res.status(201).json({ success: true, message: "User created successfully", userId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to create user" });
  }
});
app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, phone, gender, dob, department, role, status, address } = req.body;
    await db.query(
      "UPDATE users SET full_name = ?, email = ?, phone = ?, gender = ?, dob = ?, department = ?, role = ?, status = ?, address = ? WHERE id = ?",
      [fullName, email, phone, gender, dob, department, role, status, address, id]
    );
    res.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
});
app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
});
app.put("/api/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name, slug, parent_category, description, seo_title, seo_description, status, breadcrumb } = req.body;
    await db.query(
      "UPDATE categories SET category_name = ?, slug = ?, parent_category = ?, description = ?, seo_title = ?, seo_description = ?, status = ?, breadcrumb = ? WHERE id = ?",
      [category_name, slug, parent_category, description, seo_title, seo_description, status, breadcrumb, id]
    );
    res.json({ success: true, message: "Category updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update category" });
  }
});
app.get("/api/report/cards", async (req, res) => {
  try {
    const [revResult] = await db.query("SELECT SUM(total_amount) as sum FROM orders");
    const [ordersResult] = await db.query("SELECT COUNT(*) as count FROM orders");
    const [usersResult] = await db.query("SELECT COUNT(*) as count FROM users WHERE status = 'Active' OR status IS NULL");
    
    const totalRevenueVal = revResult[0].sum || 0;
    const totalRevenueStr = `₹${Number(totalRevenueVal).toLocaleString("en-IN")}`;
    
    res.json({
      totalRevenue: totalRevenueStr,
      totalOrders: ordersResult[0].count || 0,
      activeUsers: usersResult[0].count || 0,
      monthlyGrowth: "+4.1%",
    });
  } catch (error) {
    console.error("Report cards fetch error:", error);
    res.status(500).json({ message: "Error fetching report cards" });
  }
});

app.get("/api/report/recent", async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT 
        id,
        customer_name AS customer,
        total_amount AS revenue,
        status,
        created_at AS date
      FROM orders
      ORDER BY id DESC
      LIMIT 10
    `);
    const formatted = results.map(o => ({
      id: `#REP-${o.id}`,
      client: o.customer,
      revenue: `₹${Number(o.revenue || 0).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`,
      status: o.status || "Pending",
      color: o.status === "Paid" || o.status === "Completed" 
        ? "bg-emerald-100 text-emerald-800" 
        : o.status === "Pending" 
        ? "bg-amber-100 text-amber-800" 
        : "bg-rose-100 text-rose-800",
      date: o.date ? new Date(o.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" }) : "",
    }));
    res.json({ success: true, recentReports: formatted });
  } catch (error) {
    console.error("Recent report fetch error:", error);
    res.status(500).json({ success: false, message: "Error fetching recent reports" });
  }
});

app.get("/api/revenue-graph", async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT MONTH(created_at) as month, SUM(total_amount) as revenue 
      FROM orders 
      WHERE YEAR(created_at) = YEAR(CURDATE()) 
      GROUP BY MONTH(created_at) 
      ORDER BY month
    `);
    const months = Array(12).fill(0);
    results.forEach(r => {
      months[r.month - 1] = Number(r.revenue) || 0;
    });
    res.json({ success: true, data: months });
  } catch (error) {
    console.error("Revenue graph failed:", error);
    res.status(500).json({ success: false, message: "Revenue graph failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});