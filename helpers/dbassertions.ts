import mysql from "mysql2/promise";
import { expect } from "@playwright/test";

// ── Database Configuration ─────────────────────────────────────
const dbConfig = {
  host     : "localhost",
  user     : "root",
  password : "Lakshaya@2023",      // ← your MySQL password
  database : "bools" // ← your database name
};

// ── Connect and Validate ───────────────────────────────────────
async function validateSeleniumTable() {
  const connection = await mysql.createConnection(dbConfig);
  console.log("✅ MySQL Connected Successfully!\n");

  try {
    // ── Run Query ────────────────────────────────────────────────
    const [rows]: any = await connection.execute(
      "SELECT * FROM selenium"
    );

    console.log("📋 Query Result:");
    console.table(rows);
    console.log("\n🔍 Running Assertions...\n");

    // ════════════════════════════════════════════════════════
    //  1. ASSERT — rows are returned
    // ════════════════════════════════════════════════════════
    expect(rows.length).toBeGreaterThan(0);
    console.log(`✅ Assertion 1 Passed: Table has ${rows.length} row(s)`);

    // ════════════════════════════════════════════════════════
    //  2. ASSERT — all 4 columns exist
    // ════════════════════════════════════════════════════════
    const columns = Object.keys(rows[0]);
    expect(columns).toContain("tutorial_id");
    expect(columns).toContain("tutorial_title");
    expect(columns).toContain("tutorial_author");
    expect(columns).toContain("submission_date");
    console.log(`✅ Assertion 2 Passed: All columns present → ${columns}`);

    // ════════════════════════════════════════════════════════
    //  3. ASSERT — tutorial_id is positive number in every row
    // ════════════════════════════════════════════════════════
    rows.forEach((row: any) => {
      expect(typeof row.tutorial_id).toBe("number");
      expect(row.tutorial_id).toBeGreaterThan(0);
    });
    console.log("✅ Assertion 3 Passed: All tutorial_id values are positive numbers");

    // ════════════════════════════════════════════════════════
    //  4. ASSERT — tutorial_title is not empty string
    // ════════════════════════════════════════════════════════
    rows.forEach((row: any) => {
      expect(typeof row.tutorial_title).toBe("string");
      expect(row.tutorial_title.trim().length).toBeGreaterThan(0);
    });
    console.log("✅ Assertion 4 Passed: All tutorial_title values are non-empty strings");

    // ════════════════════════════════════════════════════════
    //  5. ASSERT — tutorial_author is not empty string
    // ════════════════════════════════════════════════════════
    rows.forEach((row: any) => {
      expect(typeof row.tutorial_author).toBe("string");
      expect(row.tutorial_author.trim().length).toBeGreaterThan(0);
    });
    console.log("✅ Assertion 5 Passed: All tutorial_author values are non-empty strings");

    // ════════════════════════════════════════════════════════
    //  6. ASSERT — submission_date is not null
    // ════════════════════════════════════════════════════════
    rows.forEach((row: any) => {
      expect(row.submission_date).not.toBeNull();
      expect(row.submission_date).not.toBeUndefined();
    });
    console.log("✅ Assertion 6 Passed: All submission_date values are not null");

    // ════════════════════════════════════════════════════════
    //  7. ASSERT — tutorial_id values are unique (no duplicates)
    // ════════════════════════════════════════════════════════
    const ids       = rows.map((r: any) => r.tutorial_id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
    console.log(`✅ Assertion 7 Passed: All tutorial_id values are unique → ${ids}`);

    // ════════════════════════════════════════════════════════
    //  8. ASSERT — row count matches COUNT(*) query
    // ════════════════════════════════════════════════════════
    const [countResult]: any = await connection.execute(
      "SELECT COUNT(*) as total FROM selenium"
    );
    const dbCount = Number(countResult[0].total);
    expect(rows.length).toBe(dbCount);
    console.log(`✅ Assertion 8 Passed: SELECT * count (${rows.length}) matches COUNT(*) (${dbCount})`);

    // ════════════════════════════════════════════════════════
    //  9. ASSERT — specific row values are correct
    // ════════════════════════════════════════════════════════
    const firstRow = rows[0];
    expect(firstRow.tutorial_id).toBe(1);
    expect(firstRow.tutorial_title).toBe("Playwright Basics");
    expect(firstRow.tutorial_author).toBe("Alice");
    console.log(`✅ Assertion 9 Passed: First row data → ID:${firstRow.tutorial_id}, Title:"${firstRow.tutorial_title}", Author:"${firstRow.tutorial_author}"`);

    // ════════════════════════════════════════════════════════
    //  10. ASSERT — date format is YYYY-MM-DD
    // ════════════════════════════════════════════════════════
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    rows.forEach((row: any) => {
      const dateStr = new Date(row.submission_date)
        .toISOString()
        .split("T")[0];
      expect(dateStr).toMatch(dateRegex);
    });
    console.log("✅ Assertion 10 Passed: All submission_date values match YYYY-MM-DD format");

    // ════════════════════════════════════════════════════════
    //  SUMMARY
    // ════════════════════════════════════════════════════════
    console.log("\n════════════════════════════════════════");
    console.log("🎉 All 10 Assertions Passed Successfully!");
    console.log("════════════════════════════════════════");

  } catch (error) {
    console.error("\n❌ Assertion Failed:", error);
    process.exit(1);

  } finally {
    await connection.end();
    console.log("\n🔌 Connection Closed.");
  }
}

// ── Run ────────────────────────────────────────────────────────
validateSeleniumTable();