// node async-mssql.js in the terminal to call this page
// https://www.youtube.com/watch?v=W3VZt8OkDX0

const sql = require("mssql");
// UoN-Admin, pass
const config = {
    server: "localhost\\MSSQLSERVER",
    port: 1433,
    user: "UoN-Admin", // create a user with this username and password in sql management studio
    password: "pass",
    database: "KnowUoN",
    options: {
        enableArithAbort: true,
        trustServerCertificate: true,
    },
    connectionTimeout: 150000,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
};

sql.on('error', err => {
    console.log(err.message)
})

// Async Await:
async function getDBUsersAsyncFunction() {
    try{
        let pool = await sql.connect(config)
        let result1 = await pool
            .request()
            .input('id', sql.Int, 1)
            .query("SELECT * FROM DataTest WHERE id = @id")
        console.log(result1.recordset[0])
        sql.close()
    } 
    catch (error){
        console.log(error.message)
    }
}
// getDBUsersAsyncFunction();

// Promise:
/*
sql.connect(config).then(pool => {
    return pool
        .request()
        .input('id', sql.Int, 1)
        .query("SELECT * FROM DataTest WHERE id = @id")
}).then(result => {
    console.log(result.recordset[0]);
    sql.close();
}).catch(err => {
    console.log(err.message);
    sql.close();
})
*/
// Callback:

sql.connect(config, err => {
    if(err){
        console.log(err.message);
    }
    else{
        new sql.Request().input('id', sql.Int, 1).query("SELECT * FROM DataTest WHERE id = @id", (err, result) => {
            if (err) {
                console.log(err.message);
                sql.close();
            }
            else {
                console.log(result.recordset[0]);
                sql.close();
            }
        });
    }
})

// about async, callback and promise: https://www.youtube.com/watch?v=rd4KxUrwG0U