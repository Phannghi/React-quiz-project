import { useState, useEffect, useRef } from "react";

const CountDown = (props) => {
    const timeQuiz = 1800;
    const [count, setCount] = useState(timeQuiz);
    const { isRunning } = props;
    let timeCompleted = useRef(0);

    const toHHMMSS = (sec) => {
        const hours = Math.floor(sec / 3600);
        const minutes = Math.floor((sec % 3600) / 60);
        const secs = sec % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(secs).padStart(2, '0');

        return `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;
    }

    useEffect(() => {
        if (count === 0) {
            timeCompleted.current = timeQuiz;
            props.onTimeUp();
            return;
        }
        if (!isRunning) {
            timeCompleted.current = timeQuiz - count
            return;
        }
        const timer = setInterval(() => {
            setCount(count - 1);
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, [count, isRunning])

    return (
        <div className="countdown-container">
            {toHHMMSS(count)}
        </div>
    )
}
export default CountDown;