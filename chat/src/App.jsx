// import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import socketIO from 'socket.io-client'
import Join from "./Join"
import Chat from './Chat'
import './App.css'


const ENDPOINT = "https://chat-app-ap.vercel.app/";
const socket = socketIO(ENDPOINT,{transports:["websocket"]});
function App() {
  // const [count, setCount] = useState(0)
  socket.on("connect",()=>{
    console.log("new connection");
  })

  return (
    <>
    <div className="App">
      
      <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Join/>}/>
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
      </BrowserRouter>

          </div>
     
    </>
  ) 
}

export default App
