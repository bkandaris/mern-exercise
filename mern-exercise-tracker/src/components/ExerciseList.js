import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);

  const deleteExercise = () => {};

  useEffect(() => {
    axios
      .get('http://localhost:5000/exercises')
      .then((res) => setExercises(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(exercises);
  return <div>ExerciseList Component</div>;
}
