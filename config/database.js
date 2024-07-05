const mongoose = require("mongoose")

const dbConnection = () => {
    mongoose
    .connect(process.env.DB_URI).then((conn)=>{
        console.log(`Database Connected: ${conn.connection.host}`)
    })
    // .catch((error)=>{
    //     console.log(`Database Error: ${error}`)
    //     process.exit(1)
    // })

    
    
};

module.exports = dbConnection;