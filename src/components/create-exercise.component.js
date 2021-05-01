import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function CreateExercise(props) {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/");
      if (response.data.length > 0) {
        const users = response.data.map((user) => user.username);
        const username = response.data[0].username;
        setUsername(username);
        setUsers(users);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        "http://localhost:5000/exercises/add",
        exercise
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }

    window.location = "/";
  };

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={(e) => onChangeUsername(e.target.value)}
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
            onChange={(e) => onChangeDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={(e) => onChangeDuration(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={date}
              onChange={(date) => onChangeDate(date)}
            />
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
