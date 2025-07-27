import { useState } from 'react'
import FacialExpression from "./components/FacialExpression"
import './App.css'
import MoodSongs from './components/MoodSongs'

function App() {

  const [ Songs, setSongs ] = useState([]);

  return (
    <div className="app-container">
      <div className="background-overlay"></div>
      <div className="content-wrapper">
        <header className="app-header">
          <h1 className="app-title">🎵 MoodTune</h1>
          <p className="app-subtitle">Discover music that matches your emotions</p>
        </header>
        <FacialExpression setSongs={setSongs} />
        <MoodSongs Songs={Songs} />
      </div>
    </div>
  )
};

export default App;