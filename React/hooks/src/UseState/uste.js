import React, { useState } from 'react'

function Uste() {

    const [msg, setMsg] = useState('')
    const handleChange = (e) => {
        setMsg(e.target.value)
    }
    return (
        <div>
            <input type='text' placeholder='Type Here' onChange={handleChange} value={msg}></input>
            <p>{msg}</p>
        </div>
    )
}

export default Uste
    