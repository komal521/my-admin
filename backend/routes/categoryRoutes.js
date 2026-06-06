const express = require("express");
const multer = require("multer");
const pool = require("../db");
const router = express.Router();

const ensureCategoriesTable = async () => {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      category_name VARCHAR(150) NOT NULL,
      slug VARCHAR(180),
      parent_category VARCHAR(150),
      description TEXT,
      seo_title VARCHAR(255),
      seo_description TEXT,
      status VARCHAR(50) DEFAULT 'Active',
      featured TINYINT(1) DEFAULT 0,
      sitemap TINYINT(1) DEFAULT 1,
      global_search TINYINT(1) DEFAULT 1,
      breadcrumb VARCHAR(150),
      image VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    await ensureCategoriesTable();

    const {
      category_name,
      slug,
      parent_category,
      description,
      seo_title,
      seo_description,
      status,
      featured,
      sitemap,
      global_search,
      breadcrumb,
    } = req.body;

    const image = req.file ? req.file.filename : "";

    const sql = `
      INSERT INTO categories 
      (
        category_name,
        slug,
        parent_category,
        description,
        seo_title,
        seo_description,
        status,
        featured,
        sitemap,
        global_search,
        breadcrumb,
        image
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      category_name,
      slug,
      parent_category,
      description,
      seo_title,
      seo_description,
      status,
      featured,
      sitemap,
      global_search,
      breadcrumb,
      image,
    ]);

    res.json({
      success: true,
      message: "Category Added Successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.get("/cards", async (req, res) => {
  try {
    await ensureCategoriesTable();

    const [totalRes] = await pool.query("SELECT COUNT(*) as count FROM categories");
    const [activeRes] = await pool.query("SELECT COUNT(*) as count FROM categories WHERE status='Active'");
    const [trendingRes] = await pool.query("SELECT COUNT(*) as count FROM categories WHERE status='Trending'");
    const [hiddenRes] = await pool.query("SELECT COUNT(*) as count FROM categories WHERE status='Inactive' OR status='Hidden'");

    res.json({
      totalCategories: totalRes[0]?.count || 0,
      activeCategories: activeRes[0]?.count || 0,
      trendingNow: trendingRes[0]?.count || 0,
      hiddenItems: hiddenRes[0]?.count || 0
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching category cards",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    await ensureCategoriesTable();

    const [rows] = await pool.query(
      "SELECT * FROM categories ORDER BY id DESC"
    );

    res.json(rows);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error fetching categories",
    });
  }
});

module.exports = router;
