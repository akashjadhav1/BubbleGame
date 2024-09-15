import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const totalBubble = 60;
  const [timer, setTimer] = useState(60);
  const [bubbleValues, setBubbleValues] = useState([]);
  const [hit,setHit]=useState(Math.floor(Math.random()*10))
  const [score,setScore] = useState(0);
  const [fair,setFair] = useState(true);

  // Function to decrement the timer
  const handleTimer = () => {
    setTimeout(() => {
      setTimer((prevTimer) => (prevTimer > 1 ? prevTimer - 1 : 0))
    }, 1000);
  };

const handleHit=()=>{
   setHit(Math.floor(Math.random()*10))

}

const handleClickBubble = (bubbleValue) => {
  
  if(hit===bubbleValue){
    setScore(score+10)
    handleHit();
  }
  else{
    setFair(false);
    setTimer(1);
  }
  };


  const handleRestart=()=>{
      handleHit();
      setFair(true);
      setTimer(60);
      setScore(0);
  }

  // useEffect to handle the timer
  useEffect(() => {
    if (timer > 0) {
      handleTimer();
    } else {
      clearTimeout(handleTimer); // Clear timeout when timer reaches 0
      setFair(false);
    }
  }, [timer]);

  // Generate random numbers for bubbles only once when the component mounts
  useEffect(() => {
    const randomBubbleValues = Array.from({ length: totalBubble }, () => Math.floor(Math.random() * 10));
    setBubbleValues(randomBubbleValues);
  }, [hit]); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <>
      <div className='w-[60vw] h-[60vh] border border-1 m-auto'>
        <div className='flex justify-evenly items-center bg-green-800 border border-black text-white'>
          <div className='flex items-center p-3 gap-2'>
            <p>Hit</p>
            <button className='bg-white text-black font-bold p-1 rounded w-8 h-8'>{hit}</button>
          </div>
          <div className='flex items-center gap-2'>
            <p>Timer</p>
            <button className='bg-white text-black p-1 font-bold rounded w-8 h-8'>{timer}</button>
          </div>
          <div className='flex items-center gap-2'>
            <p>Score</p>
            <button className='bg-white font-bold text-black p-1 rounded w-8 h-8'>{score}</button>
          </div>
        </div>
        <div className='bg-gray-100 shadow-xl h-full flex justify-center items-center flex-wrap gap-3 p-4'>
          {fair?bubbleValues.map((bubble, index) => (
            <div
              key={index}
              className='w-12 h-12 rounded-full border-2 border-pink-600 cursor-pointer bg-blue-500 flex justify-center items-center text-white'
              onClick={()=>handleClickBubble(bubble)}
              
            >
              {bubble}
            </div>
          )):<>
          <div className=''>
          <p className='font-bold text-4xl'>Game Over</p>
          <p className='text-lg font-normal'>Your Score is <span className={` ${score>30?"text-green-500":"text-red-500"}`}>{score}</span></p>
          <button type="button" onClick={handleRestart} className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-3">RESTART</button>
          </div>
          
          </>}
        </div>
      </div>
    </>
  );
}

export default App;
