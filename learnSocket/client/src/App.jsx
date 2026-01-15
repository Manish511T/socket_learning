import React from 'react'
import { useEffect } from 'react';
import {io} from "socket.io-client"
import { Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useMemo } from 'react';

// const socket = io("http://localhost:3000");

const App = () => {
  const socket = useMemo(()=>io("http://localhost:3000"),[])

  const [message, setMessage] = useState("");

  const handlerSubmit = (e)=>{
    e.preventDefault();
    socket.emit("message", message);
    setMessage("")
  }

  useEffect(()=>{
    socket.on("connect", ()=>{
      console.log("Connected", socket.id)
    });

    socket.on("Welcome", (e)=>{
      console.log(e)
    })

  },[]);

  return (
    <Container maxWidth="sm">
      <Typography>
        Welcome to Socket.io
      </Typography>

      <form onSubmit={handlerSubmit}>
        <TextField value={message} 
        onChange={e=>setMessage(e.target.value)} id='outlined-basic' label='Outlined' variant='outlined' />
        <Button type='submit' variant='contained' color='primary'>Send</Button>
      </form>
    </Container>
  )
}

export default App