const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")

dotenv.config({path:'config.env'}) // while i'm not call this file with .env write this line 

const dbConnection = require("./config/database")



// Connect with db
dbConnection()

// express app
const app = express()
// Middlewares
app.use(express.json())
if(process.env.NODE_ENV ==="development"){
    app.use (morgan("dev"))
    console.log(`mode: ${process.env.NODE_ENV}`)
}   // logging middlware use before route  -- logger help me during development to know all events

// Mount Routes



app.all("*",(req ,res, next)=>{

    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400))
})


//Global error handeling middleware for express

const PORT = process.env.PORT || 3000
const server = app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`)
})

// Events => list = > calback(err)
// Handel rejection outside epxress
process.on("unhandledRejection", (err)=>{
    console.log(`Unhandled rejection Errors: ${err.name} |  ${err.message}`)
    server.close(()=>{
        console.error('Shutting down....')
        process.exit(1)     // shutdown process
    })
})
