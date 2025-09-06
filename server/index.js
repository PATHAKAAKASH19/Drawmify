import express from "express"
import { Server } from "socket.io"
import http from "http"





const app = express()


const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin:"http://localhost/5173",
        methods:["POST", "GET"],
    }
})




app.use(express.urlencoded({extended:true}))
app.use(express.json())




io.on("connection",(socket) => {
    console.log("user online")


    socket.on("room" , (socket) => {

    })

    socket.on("disconnect", ()=> {
        console.log("socket disconnected")
    })
})




app.get("/" ,(req, res) => {
    return res.status.json({message: "akash pathak"})
})


server.listen("3000", () => {
    console.log("running at port 3000")
})

