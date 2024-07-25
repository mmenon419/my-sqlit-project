const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('mydatabase.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      salary REAL NOT NULL
    )`);
  
    const stmt = db.prepare(`INSERT INTO employees (first_name, last_name, email, salary) VALUES (?, ?, ?, ?)`);
  
    const employees = [
      ['Megha', 'Menon', 'mmenon419@yahoo.com', 100000],
      ['Raj', 'Kumar', 'rkumar@yahoo.com', 70000],
      ['Meena', 'Menon', 'meena.menon@gmail.com', 120000],
      ['Sujata', 'Patel', 'spatel@gmail.com', 180000]
    ];
  
    employees.forEach(employee => {
      stmt.run(employee, function(err) {
        if (err) {
          console.error(err.message);
        }
      });
    });
  
    stmt.finalize();

    db.each("SELECT * FROM employees", (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row);
    });
  });
  
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
  });