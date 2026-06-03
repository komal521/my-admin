const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});