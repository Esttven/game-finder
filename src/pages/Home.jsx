import { useState } from 'react'
import GameForm from '../components/GameForm'

function Home() {
  return (
    <div className="container">
      <h1>Encuentra tu próximo juego</h1>
      <GameForm />
    </div>
  )
}

export default Home