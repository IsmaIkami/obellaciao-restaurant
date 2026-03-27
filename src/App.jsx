import { useState } from 'react'
import { ClientView } from './views/ClientView'
import { ServerView } from './views/ServerView'
import { AdminView } from './views/AdminView'
import './App.css'

function App() {
  const [mode, setMode] = useState("client")

  const switchMode = (m) => setMode(m)

  if (mode === "server") return <ServerView onSwitchMode={switchMode} />
  if (mode === "admin") return <AdminView onSwitchMode={switchMode} />
  return <ClientView onSwitchMode={switchMode} />
}

export default App
