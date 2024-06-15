import React, { useState, useEffect } from 'react';
import TimezoneList from './TimezoneList';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker'; // Import TimePicker component
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css'; // Import TimePicker styles
import 'rc-slider/assets/index.css';
import './TimezoneConverter.css';
import moment from 'moment-timezone';

function TimezoneConverter() {
  const [timezones, setTimezones] = useState([
    { id: 1, name: 'UTC', offset: 0, sliderValue: 0 },
    { id: 2, name: 'IST', offset: 5.5, sliderValue: 5.5 },
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const localDarkMode = localStorage.getItem('darkMode');
    if (localDarkMode) {
      setDarkMode(JSON.parse(localDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const addTimezone = (selectedOption) => {
    const { label, value } = selectedOption;
    const newTimezone = {
      id: Date.now(),
      name: label,
      offset: moment.tz(value).utcOffset() / 60,
      sliderValue: moment.tz(value).utcOffset() / 60,
    };
    setTimezones([...timezones, newTimezone]);
  };

  const removeTimezone = (id) => {
    setTimezones(timezones.filter((timezone) => timezone.id !== id));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const reverseTimezones = () => {
    setTimezones([...timezones].reverse());
  };

  const getShareableLink = () => {
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    const encodedTimezones = encodeURIComponent(JSON.stringify(timezones));
    const link = `${window.location.origin}/?date=${formattedDate}&time=${selectedDate.toISOString()}&timezones=${encodedTimezones}`;
    window.open(link, '_blank');
  };

  const scheduleMeeting = () => {
    const startDateTime = moment(selectedDate).toISOString();
    const endDateTime = moment(selectedDate).add(2, 'hours').toISOString();
    const encodedStartDateTime = encodeURIComponent(startDateTime);
    const encodedEndDateTime = encodeURIComponent(endDateTime);
    const meetingUrl = `https://meet.google.com/new?date=${encodedStartDateTime}&endDate=${encodedEndDateTime}`;
    window.open(meetingUrl, '_blank');
  };

  return (
    <div className="TimezoneConverter">
      <h1 className="converter-heading">Time Zone Converter</h1>
      <div className="converter-content">
        <div className="action-buttons">
          <button onClick={toggleDarkMode} style={{ marginRight: '10px' }}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
          <button onClick={getShareableLink} style={{ marginRight: '10px' }}>Get Shareable Link</button>
          <button onClick={scheduleMeeting} style={{ marginRight: '10px' }}>Schedule Meet</button>
          <button className="remove-btn" onClick={reverseTimezones}>Reverse Timezones</button>
        </div>
        <div className="date-picker-dark-mode" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <div className="flex flex-col min-h-screen bg-gray-100">
            <DatePicker selected={selectedDate} onChange={handleDateChange} />
          </div>
        </div>
        <select onChange={(e) => addTimezone(JSON.parse(e.target.value))} style={{ marginBottom: '20px' }}>
          <option>Select Timezone</option>
          {moment.tz.names().map((name) => (
            <option key={name} value={JSON.stringify({ label: name, value: name })}>
              {name}
            </option>
          ))}
        </select>
        <TimezoneList
          timezones={timezones}
          setTimezones={setTimezones}
          removeTimezone={removeTimezone}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}

export default TimezoneConverter;
