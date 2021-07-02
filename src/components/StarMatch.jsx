import React, {useState} from 'react'
import {Game} from '../App'

export default function StarMatch() {

  const [gameId, setGameId] = useState(1);

  return (
      <Game key={gameId} startNewGame={()=>setGameId(gameId + 1)}/>
  )
}
