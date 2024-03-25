import http from "http"
import express from "express"
import cors from 'cors'
import {Server} from 'socket.io'
import { Socket } from "dgram";
// const socketio = require('socket.io')
// const cors = require('cors')
// const http = require('http')
// const express = require('express')

const app = express();
const server = http.createServer(app)

const io = new  Server(server);
const port = 3000 || process.env.PORT;
const users = [{}]
app.use(cors());
app.get("/",(req,res)=>{

    res.send("Hell its working fine ")
})

io.on("connection",(socket)=>{
    socket.on("joined",({user})=>{
        users[socket.id]=user;
        console.log(`hello ${users[socket.id]}`)
        socket.broadcast.emit("userJoined",{user:"admin",message:`${users[socket.id]} has joined the chat`})
        socket.emit("welcome",{user:"admin",message:"welcome to the chat"})

    })
    socket.on("message",({messageData,id})=>{
        console.log(messageData)
        console.log(id)
        const message = messageData
        io.emit("sendMessage",{user:users[id],message,id})

    })
    socket.on("disconnected",()=>{
        socket.broadcast.emit("leave",{user:"admin",message:"user has left the chat"})
        console.log("user left");
    })
})

server.listen(port,()=>{
    // console.log("server is working",port)
    console.log(`The port is working on the http://localhost:${port}`);
})