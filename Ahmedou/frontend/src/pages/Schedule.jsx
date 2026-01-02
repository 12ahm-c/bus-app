import { useEffect, useState } from 'react';
import { getSchedules } from '../services/scheduleService';

function Schedule() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    getSchedules()
      .then(data => setSchedules(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Bus Schedule</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Bus</th>
            <th>Route</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {schedules.length === 0 ? (
            <tr>
              <td colSpan="5">No schedules available</td>
            </tr>
          ) : (
            schedules.map(schedule => (
              <tr key={schedule.id}>
                <td>{schedule.bus_id}</td>
                <td>{schedule.route}</td>
                <td>{schedule.departure_time}</td>
                <td>{schedule.arrival_time}</td>
                <td>{schedule.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;
