
import { useEffect, useState } from 'react'
import { user } from './Join'
import sockerIO from "socket.io-client"
import sendimg from '../src/send.png'
import Message from './Message/Message'
import cross from '../src/closeIcon.png'
import ReactScrolllToBottom from 'react-scroll-to-bottom'
import './chat.css'
const ENDPOINT = "https://cchat-api.vercel.app/"
let socket;
const Chat = () => {
    const [messageData, setMessageData] = useState("");
    const [id,setId] = useState("")
    const [messages,setMessages] = useState([])
    const send=()=>{
        console.log(messageData)
        socket.emit("message",{messageData,id})
        setMessageData("")
    }
    useEffect(()=>{
        socket = sockerIO(ENDPOINT,{transports:["websocket"]})
        socket.on("connect",()=>{
            // alert("connected")
        setId(socket.id)
    })
    socket.emit("joined",{user})
    socket.on("welcome",(data)=>{
        setMessages([...messages, data])
        console.log(data.user)
        console.log(data.message)
    })
    socket.on("userJoined",(data)=>{
        setMessages([...messages, data])

        console.log(data.user)
        console.log(data.message)
    })
    socket.on("leave",(data)=>{
        setMessages([...messages, data])

        console.log(data.user);
        console.log(data.message);
    })
    return ()=>{

        socket.emit("disconnected")
        socket.off()
    }
    
   },[])
   useEffect(()=>{
    socket.on("sendMessage",(data)=>{
        setMessages([...messages, data])

        console.log(data.user,data.message,data.id);
        socket.off()
    })
   },[messages])
    return (

        <div className="chatpage">
            <div className="chatcontainer">
                <div className="header">
                    <h2>C CHAT</h2>
                   <a href="/"> <img src={cross} alt="" /></a>
                </div>
                <ReactScrolllToBottom className="chatbox">
                    {messages.map((item,i)=><Message key={i} user={item.id === id?'':item.user} message={item.message} classes={item.id === id ?"right":"left"}/>)}
                    </ReactScrolllToBottom>
                <div className="inputbox">
                    <input onKeyPress ={(event)=>event.key === 'Enter'? send():null} type="text"  id='chatinput' onChange={(e)=>setMessageData(e.target.value)}/>
                    <button className='sendbtn' onClick={send}><img src={sendimg} alt="" /></button>
                </div>
            </div>
            </div>

    )
}

export default Chat
