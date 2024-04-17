import * as SQLite from "expo-sqlite";

//Connection is initialised globally
const db = SQLite.openDatabase("tasks1.db");

const database = {
    db: db, // Database connection object
    initDatabase: () => { 
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS tasks (ID INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, status TEXT, synced INTEGER);"
            );
        });
    }
};

export default database;
