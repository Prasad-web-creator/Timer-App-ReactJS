import {useState,useRef} from 'react'

export default function App() {

const [time, setTime] = useState({ sec: 0, min: 0, hour: 0 });
const [isStop,setIsStop] = useState(false)

let intervalRef = useRef(null)

const startTimer = () => {
  console.log(intervalRef.current ? true:false)
  if (intervalRef.current) return;
  intervalRef.current = setInterval(() => {
    setTime((prev) => {
      let { sec, min, hour } = prev;
      sec++;
      if (sec === 60) {
        sec = 0;
        min++;
      }
      if (min === 60) {
        min = 0;
        hour++;
      }
      if (hour === 24) {
        hour = 0;
      }
      return { sec, min, hour };
    });
  }, 1000);
};

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsStop(true)
    intervalRef.current = null;
  };

  return (
    <div className='timer-container'>
      <div className='timer'>
        <div className='heading'>Set Timer</div>
        <div className='hms'>
          <div className='hour'>{time.hour < 10 ? "0"+time.hour : time.hour}</div>
          <div className='min'>{time.min < 10 ? "0"+time.min : time.min}</div>
          <div className='sec'>{time.sec < 10 ? "0"+time.sec : time.sec}</div>
        </div>
        <div className='buttons'>
          <button onClick={startTimer}>{isStop ? "Resume" : "Start"}</button>
          <button onClick={stopTimer}>Stop</button>
        </div>
      </div>
    </div>
  )
}
