import React, { useState } from 'react';
import axios from 'axios';

export default function CreateUser(props) {
  const [user, setUser] = useState({
    username: '',
  });


  const onChangeUsername = (e) => {
    setUser({username: e.target.value});
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/users/add', user )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setUser({
      username: '',
    });
    console.log(user);
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Username: </label>
          <input
            name='username'
            type='text'
            required
            className='form-control'
            value={user.username}
            onChange={onChangeUsername}
          />
        </div>
        <div className='form-group'>
          <input
            type='submit'
            value='Create User'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
}
