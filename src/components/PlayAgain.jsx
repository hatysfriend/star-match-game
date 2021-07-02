import React from 'react';
import '../App.css'

export default function PlayAgain({resetGame, gameStatus}) {
  return (
    <div className="game-done">
      <div className="message" style={{color: gameStatus==='lost' ? 'red' : 'green'}}>
        {gameStatus === 'lost' ? 'Game Over' : 'You Win!'}
      </div>
      <button onClick={resetGame}>Play Again</button>
    </div>
  )
}
