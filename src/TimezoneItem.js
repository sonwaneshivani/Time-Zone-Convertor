import React from 'react';

function TimezoneItem({ timezone, removeTimezone }) {
  return (
    <div style={{ marginBottom: '50px' }}>
      <span>{timezone.name}</span>
      <button onClick={() => removeTimezone(timezone.id)}>Remove</button>
      <br />
      <div>Time : {timezone.currentTime}</div>
    </div>
  );
}

export default TimezoneItem;
