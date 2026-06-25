import mysql from "mysql2/promise";

// ── Database Configuration ─────────────────────────────────────
const dbConfig = {
  host     : "localhost",
  user     : "root",
  password : "Lakshaya@2023",      // ← your MySQL password
  database : "bools" // ← your database name
};

// ── Connect and Run Query ──────────────────────────────────────
async function connectDB() {
  try {
    // Create connection
    const connection = await mysql.createConnection(dbConfig);
    console.log("✅ MySQL Connected Successfully!");

    // Test query
    const [rows] = await connection.execute("SELECT * FROM selenium");
    console.log("📋 Query Result:");
    console.table(rows);

    // Close connection
    await connection.end();
    console.log("🔌 Connection Closed.");

  } catch (error) {
    console.error("❌ Connection Failed:", error);
  }
}

// Run
connectDB();