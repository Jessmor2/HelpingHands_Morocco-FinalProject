import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

const CircularProgressBar = () => {
  const { store, actions } = useContext(Context);
  const [progress, setProgress] = useState(0);
  const radius = 95;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = (1 - progress / 100) * circumference;

  useEffect(() => {
    actions.fetchAllDonation();
  }, []);

  useEffect(() => {
    setProgress(store.progressPercentage);
  }, [store.progressPercentage]);

  return (
    <div className="circularProgressBar">
      <svg className="circular-progress" width={radius * 2} height={radius * 2}>
        <circle
          className="circular-progress-background"
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          strokeWidth={strokeWidth}
        />
        <circle
          className="circular-progress-bar"
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
        <text
          x={radius}
          y={radius}
          className="circular-progress-text"
          textAnchor="middle"
          dy=".35em"
          fill="#333"
          transform={`rotate(95 ${radius} ${radius})`} // Set x and y to radius and rotate 360 degrees
        >
          {progress}%
        </text>

      </svg>
    </div>
  );
}

export default CircularProgressBar;
