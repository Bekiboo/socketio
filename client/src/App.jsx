import io from 'socket.io-client'
import './App.css'
import _ from 'lodash'
import { useEffect, useRef, useState } from 'react'

function App() {
  const socket = useRef(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    socket.current = io('http://localhost:3000')

    socket.current.on('connect', () => {
      console.log('Connected to the server!')

      socket.current.on('mouseMove', (data) => {
        const { id, x, y } = data
        setUsers((prev) =>
          prev.map((user) => (user.id === id ? { ...user, x, y } : user))
        )
      })

      // handle current users
      socket.current.on('usersConnected', (data) => {
        console.log('Current Users:', data)
        const users = data.map((user) => ({
          id: user.id,
          x: -100,
          y: -100,
          color: user.color,
        }))
        setUsers(users)
      })
      socket.current.on('newUserConnected', (data) => {
        console.log('New User Connected:', data.id)
        setUsers((prev) => [
          ...prev,
          { id: data.id, x: -100, y: -100, color: data.color },
        ])
      })
      socket.current.on('userDisconnected', (data) => {
        console.log('User Disconnected:', data.id)
        setUsers((prev) => prev.filter((user) => user.id !== data.id))
      })
    })

    return () => {
      socket.current.disconnect()
    }
  }, [])

  function handleMouseMove(event) {
    const { clientX, clientY } = event
    socket.current.emit('mouseMove', { x: clientX, y: clientY })
  }

  return (
    <div className="App" onMouseMove={_.throttle(handleMouseMove, 50)}>
      <h2>
        {users.length} user{users.length > 1 && 's'} connected
      </h2>
      {users.map(
        (user) =>
          user.id !== socket.current.id && (
            <div
              key={user.id}
              className="user"
              style={{
                top: user.y,
                left: user.x,
                backgroundColor: user.color,
              }}
            />
          )
      )}{' '}
    </div>
  )
}

export default App
