import io from 'socket.io-client'
import './App.css'
import _ from 'lodash'
import { useEffect, useRef, useState } from 'react'

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function App() {
  const socket = useRef(null)
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    socket.current = io('http://localhost:3000')

    socket.current.on('connect', () => {
      console.log('Connected to the server!')

      socket.current.on('userId', (data) => {
        setUser(data.id)
      })

      socket.current.on('mouseMove', (data) => {
        const { id, x, y } = data
        setUsers((prev) =>
          prev.map((user) => (user.id === id ? { ...user, x, y } : user))
        )
      })

      // handle current users
      socket.current.on('usersConnected', (data) => {
        console.log('Current Users:', data)
        const users = data.map((id) => ({
          id,
          x: -100,
          y: -100,
          color: generateRandomColor(),
        }))
        setUsers(users)
      })
      socket.current.on('newUserConnected', (data) => {
        setUsers((prev) => [...prev, data.id])
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
        (userr) =>
          userr.id !== user && (
            <div
              key={userr.id}
              className="user"
              style={{
                top: userr.y,
                left: userr.x,
                backgroundColor: userr.color,
              }}
            />
          )
      )}{' '}
    </div>
  )
}

export default App
