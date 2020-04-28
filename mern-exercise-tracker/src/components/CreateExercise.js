import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default function CreateExercise(props) {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(Date.now());

  const [users, setUsers] = useState([
    {
      user: '',
      username: '',
    },
  ]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  });

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleDuration = (e) => {
    e.preventDefault();
    setDuration(e.target.value);
  };

  const handleDate = (e) => {
    setDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date,
    };
    console.log('exercise list', exercise);

    axios
      .post('http://localhost:5000/exercises/add', exercise)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    // window.location = '/';
  };
  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Username: </label>
          <select
            required
            className='form-control'
            value={username}
            onChange={handleUsername}>
            {users.map((users) => {
              return (
                <option key={users.user} value={users.user}>
                  {users.username}
                </option>
              );
            })}
          </select>
        </div>
        <div className='form-group'>
          <label>Duration (in minutes): </label>
          <input
            type='text'
            className='form-control'
            value={duration}
            onChange={handleDuration}
          />
        </div>

        <div className='form-group'>
          <label>Description: </label>
          <input
            type='text'
            className='form-control'
            value={description}
            onChange={handleDescription}
          />
        </div>
        <div className='form-group'>
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={handleDate} />
          </div>
        </div>

        <div className='form-group'>
          <input
            type='submit'
            value='Create Exercise Log'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
}
