import React from 'react'
import '../App.css';

export default function PlayNumber({number, status, onNumberClick}) {
  return (
    <button 
      className="number" 
      style={{backgroundColor: colors[status]}}
      onClick={()=>{onNumberClick(number, status);}}
    >
      {number}
    </button>
  )
}

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};
