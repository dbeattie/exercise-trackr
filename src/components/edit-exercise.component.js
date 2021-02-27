import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function EditExercise(props) {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/exercises/" + props.match.params.id
      );

      setUsername(response.data.username);
      setDescription(response.data.description);
      setDuration(response.data.duration)
      setDate(new Date(response.data.date))

      const userList = await axios.get("http://localhost:5000/users/");
      setUsers(userList.data.map((user) => user.username));
    } catch (error) {
      console.log(error);
    }
  }

  const onChangeUsername = (e) => {
    setUsername(e);
  };

  const onChangeDescription = (e) => {
    setDescription(e);
  };

  const onChangeDuration = (e) => {
    setDuration(e);
  };

  const onChangeDate = (date) => {
    setDate(date);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/exercises/update/" + props.match.params.id,
        exercise
      );
      console.log("RESPONSE DATA:", res.data);
    } catch (error) {
      console.error(error);
    }

    window.location = "/";
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            className="form-control"
            value={username}
            onChange={e => onChangeUsername(e.target.value)}
          >
            {users.map(function (user) {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={e => onChangeDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={e => onChangeDuration(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <DatePicker
            selected={date}
            onChange={(date) => onChangeDate(date)}
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
