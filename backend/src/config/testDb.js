const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const passwordsToTest = ['postgres', 'admin', 'root', '1234', 'password', ''];
const user = process.env.DB_USER || 'postgres';
const host = process.env.DB_HOST || 'localhost';
const port = parseInt(process.env.DB_PORT || '5432');

async function testConnections() {
  console.log(`🔍 Testing PostgreSQL connections on ${host}:${port} (User: ${user})...`);

  for (const pwd of passwordsToTest) {
    const client = new Client({
      user,
      host,
      database: 'postgres', // Connect to default postgres DB first to create noc_verify_db
      password: pwd,
      port,
    });

    try {
      await client.connect();
      console.log(`✅ Success! Connected to PostgreSQL with password: "${pwd}"`);

      // Create noc_verify_db if it doesn't exist
      try {
        await client.query('CREATE DATABASE noc_verify_db;');
        console.log('✅ Created database "noc_verify_db"');
      } catch (e) {
        if (e.code === '42P04') {
          console.log('ℹ️ Database "noc_verify_db" already exists.');
        } else {
          console.warn('Note on DB creation:', e.message);
        }
      }
      await client.end();

      // Connect directly to noc_verify_db to run DDL schema.sql
      const dbClient = new Client({ user, host, database: 'noc_verify_db', password: pwd, port });
      await dbClient.connect();
      
      const schemaPath = path.join(__dirname, '../database/schema.sql');
      if (fs.existsSync(schemaPath)) {
        const sql = fs.readFileSync(schemaPath, 'utf8');
        await dbClient.query(sql);
        console.log('✅ Successfully initialized tables & seed data in PostgreSQL "noc_verify_db"!');
      }
      await dbClient.end();

      // Write .env file
      const envContent = `PORT=5000\nDB_USER=${user}\nDB_HOST=${host}\nDB_NAME=noc_verify_db\nDB_PASSWORD=${pwd}\nDB_PORT=${port}\n`;
      fs.writeFileSync(path.join(__dirname, '../../.env'), envContent);
      console.log('✅ Created backend/.env file with active database credentials');

      return pwd;
    } catch (err) {
      // Try next password
    }
  }

  console.log('⚠️ Could not connect automatically with standard default passwords.');
  return null;
}

testConnections();
