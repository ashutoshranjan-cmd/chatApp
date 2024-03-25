import './message.css'

import React from 'react'

const Message = ({user,message,classes})=>{
    if(user)
    {
        return(
            <div className={`messagebox ${classes}`}>
                {`${user}:${message}`}
            </div>
        )
    }
    else{
        return(
            <div className={`messagebox ${classes}`}>
                {`you : ${message}`}
            </div>
        )
    }

}

export default Message