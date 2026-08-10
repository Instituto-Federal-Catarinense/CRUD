const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const fs = require('fs');

const sql = fs.readFileSync('database.sql', 'utf8');

db.exec(sql, (err) => {
  if (err) {
    console.error('Error initializing database:', err);
  } else {
    console.log('Database initialized successfully');
  }
  db.close();
});