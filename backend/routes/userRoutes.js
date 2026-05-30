const express = require("express");
const router = express.Router();

const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const [users] = await pool.execute(`
      SELECT id, fullName, email, phone, department, role, status, address, created_at
      FROM users
      ORDER BY id DESC
    `);

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Users load nahi ho paaye",
      error: error.message,
    });
  }
});

router.post("/create-user", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      department,
      role,
      status,
      password,
      address,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !department ||
      !role ||
      !status ||
      !password ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const sql = `
      INSERT INTO users
      (fullName, email, phone, department, role, status, password, address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
      fullName,
      email,
      phone,
      department,
      role,
      status,
      password,
      address,
    ]);

    res.json({
      success: true,
      message: "User Created Successfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.log(error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "This email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "User create nahi hua. Backend/database check karo.",
      error: error.message,
    });
  }
});

module.exports = router;
