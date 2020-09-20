const SQLite = require("better-sqlite3");
const sql = new SQLite('./db.sqlite');
const sql2 = new SQLite('./mdb.sqlite');

module.exports = client => {
    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'db';").get();
    if (!table['count(*)']) {
      // If the table isn't there, create it and setup the database correctly.
      sql.prepare("CREATE TABLE db (id TEXT PRIMARY KEY, user TEXT, guild TEXT, xp INTEGER, level INTEGER);").run();
      // Ensure that the "id" row is always unique and indexed.
      sql.prepare("CREATE UNIQUE INDEX idx_db_id ON db (id);").run();
      sql.pragma("synchronous = 1");
      sql.pragma("journal_mode = wal");
    }
    const table2 = sql2.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'mdb';").get();
    if (!table2['count(*)']) {
      // If the table isn't there, create it and setup the database correctly.
      sql2.prepare("CREATE TABLE mdb (id TEXT, user TEXT, channel TEXT, meme TEXT PRIMARY KEY);").run();
      // Ensure that the "id" row is always unique and indexed.
      sql2.prepare("CREATE UNIQUE INDEX idx_mdb_id ON mdb (meme);").run();
      sql2.pragma("synchronous = 1");
      sql2.pragma("journal_mode = wal");
    }
    console.log(`Logged in as ${client.user.tag}!`);
}