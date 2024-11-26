import io from 'socket.io-client'
import './App.css'
import { useEffect } from 'react'
import Input from './components/input'

function App() {
  const socket = io('http://localhost:3000')

  function connectSocket() {
    socket.on('connection', (socket) => {
      console.log('Hello!')
    })
  }

  function handleInput(event) {
    const { name, value } = event.target
    console.log({ [name]: value })
  }

  useEffect(() => {
    connectSocket()
  }, [])
  return (
    <>
      <h1>React Multiplayer Dashboard</h1>
      <Input
        name="name"
        placeholder="Enter your name"
        handleInput={handleInput}
      />
      <Input
        name="score"
        placeholder="Enter your score"
        handleInput={handleInput}
      />
    </>
  )
}

export default App
