import './App.css';
import PlayNumber from './components/PlayNumber'
import StarDisplay from './components/StarDisplay';
import PlayAgain from './components/PlayAgain';
import StarMatch from './components/StarMatch';
import { useGameState } from './components/useGameState';

export default function App() {
  return (
    <div className="App">
     <StarMatch/>
    </div>
  );
}


export const Game = ({startNewGame}) => {
  const {stars, availableNums, candidateNums, secondsLeft, setGameState} = useGameState();

  const candidatesAreWrong = utils.sum(candidateNums) > stars;

  const gameStatus = 
    availableNums.length === 0 ? 'won' 
    : secondsLeft === 0 ? 'lost' : 'active'
  
  const numberStatus = (number) => {
    if(!availableNums.includes(number)) {
      return 'used';
    }
    if(candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }
    return 'available';
  }

  const onNumberClick = (number, currentStatus) => {
    console.log(number, currentStatus);
    
    if(currentStatus === 'used' || gameStatus !== 'active'){
      return;
    }
    const newCandidateNums = 
      currentStatus === 'available' 
      ? candidateNums.concat(number)
      : candidateNums.filter(cn => cn !== number); 

    setGameState(newCandidateNums);
  }

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ? <PlayAgain resetGame={startNewGame} gameStatus={gameStatus}/> : <StarDisplay count={stars} />}
        </div>
        <div className="right">
          {utils.range(1, 9).map((number)=> 
            <PlayNumber 
              key={number} 
              number={number} 
              status={numberStatus(number)} 
              onNumberClick={onNumberClick}
            /> 
          )}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};



// Math science
export const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};