import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Exercise from './exercise.component';

export default function ExercisesList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await axios.get("http://localhost:5000/exercises/");
      setExercises(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExercise = async (id) => {
    try {
      const res = await axios.delete("http://localhost:5000/exercises/" + id);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }

    // more effecient but not working
    // setExercises({
    //   exercises: exercises.filter((el) => el._id !== id),
    // });
    // just refreshing the page, maybe not most efficent
    window.location = "/";
  };

  // pull out to a component file
  const exerciseList = exercises.map((currentexercise) => {
    return (
      <Exercise
        exercise={currentexercise}
        deleteExercise={deleteExercise}
        key={currentexercise._id}
      />
    );
  });

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList}</tbody>
      </table>
    </div>
  );
}
