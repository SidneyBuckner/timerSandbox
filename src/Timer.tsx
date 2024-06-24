import React, { useState, useEffect } from 'react'

type TimerType = {
  minutes: number,
}

const convertMintuesToMilliseconds = (minutes: number) => {
  return minutes * 60 * 1000;
}

const Timer = ({minutes}: TimerType) => {
    const [isRunning, setIsRunning] = useState(false)
    const [timeRemaining, setTimeRemaining] = useState(convertMintuesToMilliseconds(minutes));

    useEffect(() => {
        if (isRunning) {
          if (!timeRemaining) {
           reset();
            return
          } 
          const intervalId = setInterval(() => {
            setTimeRemaining(timeRemaining - 10);
          }, 10);
          return () => clearInterval(intervalId);
        }
    }, [isRunning, timeRemaining])

    const toggleTimer = () => {
        setIsRunning(!isRunning)
    }
    
    const handleReset = () => {
      reset();
    }

    const reset = () => {
      setIsRunning(false);
      setTimeRemaining(convertMintuesToMilliseconds(minutes));
    }

    const formatTime = (time: number) => {
        const hours = (time / 1000 / 60 / 60);
        const minutes = (hours % 1) * 60;
        const seconds = ((minutes % 1) * 60);
        const milliseconds =((seconds % 1) * 1000);
      
        return `${formatTimeWithZeroes(hours)}:${formatTimeWithZeroes(minutes)}:${formatTimeWithZeroes(seconds)}.${formatTimeWithZeroes(milliseconds)}`
    }

    const formatTimeWithZeroes = (value :number) =>{
      return String(Math.floor(value)).padStart(2,"0").slice(-2);
    }
        return (
        <div>
            <h1>{formatTime(timeRemaining)}</h1>
            <button onClick={toggleTimer}>{isRunning ? "Pause" : "Start" }</button> 
            <button onClick={handleReset} disabled={isRunning}>
                Reset
            </button>
        </div>
    )
}

export default Timer;
