
import React, { useState, useEffect } from "react";
import "../../styles/countDown.css"

const CountdownTimer = ({ dueDate }) => {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    function calculateTimeRemaining() {
        const now = new Date();
        const timeDiff = dueDate - now;
        if (timeDiff <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        return { days, hours, minutes, seconds };
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            const remaining = calculateTimeRemaining();
            setTimeRemaining(remaining);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="countdown-timer">
            <h2 className="countDownHeading">Time to Make a Difference</h2>
            <div className="numberOfDays" >
                <div className="card" style={{ width: "200px", height: "155px" }}>
                    <div className="card-body">
                        <h3 className="card-text "><span className="timeRemaining fs-1 mt-5">{timeRemaining.days}</span></h3>
                    </div>
                    <div className="card-footer timeRemainingFooter">
                        Days
                    </div>
                </div>

                <div className="card" style={{ width: "200px", height: "155px" }}>
                    <div className="card-body">
                        <h3 className="card-text "><span className="timeRemaining fs-1">{timeRemaining.hours}</span></h3>
                    </div>
                    <div className="card-footer timeRemainingFooter">
                        Hours
                    </div>
                </div>

                <div className="card" style={{ width: "200px", height: "155px" }}>
                    <div className="card-body">
                        <h3 className="card-text "><span className="timeRemaining fs-1">{timeRemaining.minutes}</span></h3>
                    </div>
                    <div className="card-footer timeRemainingFooter ">
                        Minutes
                    </div>
                </div>
                <div className="card" style={{ width: "200px", height: "155px" }}>
                    <div className="card-body">
                        <h3 className="card-text "><span className="timeRemaining fs-1">{timeRemaining.seconds}</span></h3>
                    </div>
                    <div className="card-footer timeRemainingFooter">
                        Seconds
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CountdownTimer;
