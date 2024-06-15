import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";

const DateTimePicker = ({ onDateTimeChange }) => {
  const [startDate, setStartDate] = useState(() => {
    const storedDate = localStorage.getItem("selectedDate");
    return storedDate ? moment(storedDate).toDate() : moment().toDate();
  });

  const handleChange = (date) => {
    setStartDate(date);
    localStorage.setItem("selectedDate", date);
    onDateTimeChange(date);
  };

  useEffect(() => {
    const storedDate = localStorage.getItem("selectedDate");
    if (storedDate) {
      setStartDate(moment(storedDate).toDate());
    }
  }, []);

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput={true}
      timeInputLabel="Time:"
      className="form-input block max-w-xs w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      wrapperClassName="flex flex-col space-y-2"
    />
  );
};

export default DateTimePicker;
