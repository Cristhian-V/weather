import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [coords1, setCoords1] = useState()

  const success = position => {
    setCoords1({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    })
  }

  console.log(coords1.lat)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  return (
    <div className="App">

    </div>
  )
}

export default App
