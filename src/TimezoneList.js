import React from 'react';

function TimezoneList({ timezones, setTimezones, removeTimezone, selectedDate }) {
  // Function to handle slider change for individual timezone
  const handleSliderChange = (id, value) => {
    // Calculate the difference between the new value and the previous value of the moved slider
    const diff = value - timezones.find((timezone) => timezone.id === id).sliderValue;

    // Update slider values for all timezones
    const updatedTimezones = timezones.map((timezone) => ({
      ...timezone,
      sliderValue: timezone.sliderValue + diff,
    }));
    
    setTimezones(updatedTimezones);
  };

  // Function to get the time at selected date and IST time
  const getTimeAtSelectedDate = (offset) => {
    return new Date(selectedDate.getTime() + offset * 60 * 60 * 1000).toLocaleTimeString();
  };

  return (
    <div>
      {timezones.map((timezone) => (
        <div key={timezone.id}>
          <span>{timezone.name}</span>
          {/* Slider for individual timezone */}
          <input
            type="range"
            min={-12}
            max={12}
            step={0.5}
            value={timezone.sliderValue}
            onChange={(e) => handleSliderChange(timezone.id, parseFloat(e.target.value))}
          />
          {/* Display time at selected date */}
          <div>Time : {getTimeAtSelectedDate(timezone.sliderValue)}</div>
        
          {/* Button to remove timezone */}
          <button onClick={() => removeTimezone(timezone.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default TimezoneList;
