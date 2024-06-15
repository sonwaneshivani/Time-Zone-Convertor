import React, { useState, useEffect } from 'react';
import TimeSlider from './TimeSlider';

function TimeZoneConverter() {
  const [timeZones, setTimeZones] = useState([{ name: 'UTC', time: new Date() }]);

  useEffect(() => {
    // This effect ensures that when a new time zone is added, it initializes its time to the current time
    const intervalId = setInterval(() => {
      setTimeZones(prevTimeZones => {
        return prevTimeZones.map(timeZone => {
          return { ...timeZone, time: new Date() };
        });
      });
    }, 1000); // Update time every second

    return () => clearInterval(intervalId);
  }, []);

  const handleTimeChange = (index, time) => {
    setTimeZones(prevTimeZones => {
      const newTimeZones = [...prevTimeZones];
      newTimeZones[index].time = time;

      return newTimeZones;
    });
  };

  const handleAddTimeZone = () => {
    setTimeZones(prevTimeZones => {
      const newTimeZones = [...prevTimeZones, { name: `TimeZone ${prevTimeZones.length}`, time: new Date() }];
      return newTimeZones;
    });
  };

  return (
    <div>
      {timeZones.map((timeZone, index) => (
        <div key={index}>
          <span>{timeZone.name}</span>
          <TimeSlider selectedTime={timeZone.time} onTimeChange={(time) => handleTimeChange(index, time)} />
        </div>
      ))}
      <button onClick={handleAddTimeZone}>Add Time Zone</button>
    </div>
  );
}

export default TimeZoneConverter;
