const fs = require('fs');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function run() {
  const sql = fs.readFileSync('migration_script.sql', 'utf8');

  // Remove lines that are MySQL Workbench comments starting with --
  const lines = sql.split(/\r?\n/).filter(l => !l.trim().startsWith('--'));
  const clean = lines.join('\n');

  // Split by semicolon and filter empty statements
  const stmts = clean.split(';').map(s => s.trim()).filter(Boolean);

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: false,
  });

  try {
    for (let i = 0; i < stmts.length; i++) {
      const stmt = stmts[i];
      if (!stmt) continue;
      try {
        // Execute each statement individually
        await conn.query(stmt);
        console.log(`OK [${i+1}/${stmts.length}]`);
      } catch (err) {
        console.error(`ERROR executing statement ${i+1}:`, err.message);
        console.error('Failed statement preview:', stmt.slice(0,200).replace(/\n/g, ' '));
        throw err;
      }
    }

    console.log('Migration completed successfully.');
  } finally {
    await conn.end();
  }
}

run().catch(err => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});
