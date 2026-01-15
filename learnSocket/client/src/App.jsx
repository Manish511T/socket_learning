import React from 'react'
import { useEffect } from 'react';
import { io } from "socket.io-client"
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useMemo } from 'react';

// const socket = io("http://localhost:3000");

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), [])

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketID] = useState("");
  const [roomName, setRoomName] = useState("")

  // console.log(messages)
  const handlerSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("")
  }

  const joinRoomHandler= (e)=>{
    e.preventDefault()
    socket.emit("join-room", roomName);
    setRoomName("");
  }

  useEffect(() => {
    socket.on("connect", () => {
      setSocketID(socket.id);
      console.log("Connected", socket.id)
    });

    socket.on("recieve-message", (e) => {
      console.log(e);
      setMessages((messages) => [...messages, e])
    })

  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: 100 }} />
      <Typography>
        Welcome to Socket.io :
      </Typography>
      <Typography>
        {socketID}
      </Typography>

      <form onSubmit={joinRoomHandler}>
        <h5>Join Room</h5>
        <TextField value={roomName}
          onChange={e => setRoomName(e.target.value)}
          id='outlined-basic' label='Message' variant='outlined' />
          <Button type='submit' variant='contained' color='primary'>Join</Button>
      </form>
      <br />

      <form onSubmit={handlerSubmit}>
        <TextField value={message}
          onChange={e => setMessage(e.target.value)}
          id='outlined-basic' label='Message' variant='outlined' />
        {/* <Button type='submit' variant='contained' color='primary'>Send</Button> */}

        <TextField value={room}
          onChange={e => setRoom(e.target.value)}
          id='outlined-basic' label='room' variant='outlined' />
        <Button type='submit' variant='contained' color='primary'>Send</Button>
      </form>
      <Stack>
        {
          messages.map((m, i) => (
            <Typography key={i} variant='h6' component="div" gutterBottom >
              {m}
            </Typography>
          ))
        }
      </Stack>
    </Container>
  )
}

export default App