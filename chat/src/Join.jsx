import './join.css'
import logo from './logo.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
// import Chat from './Chat'
let user ;
const Join = ()=>{
const [inputValue,setInput] = useState("");
const getValue = (e)=>
{
    setInput(e.target.value);
}
const sendUser = ()=>{
    if(inputValue)
     user = inputValue;
    else
        alert('please enter your user name')

}
    return (
        <div className="JoinPage">
            <div className="JoinContainer">
                <img src={logo} alt="" />
                <h1>C CHAT</h1>
                <input type="text" onChange={getValue} name="" id="joinInput" placeholder='Enter your name here' />
               <Link to={ inputValue ? "/chat": null}><button onClick={sendUser} className='joinbtn'>Log in</button></Link> 
              
            </div>
        </div>
    )
}

export default Join;
export {user}