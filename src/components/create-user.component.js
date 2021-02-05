import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateUser() {
  const [user, setUser] = useState("");

  const onChangeUsername = (e) => {
    setUser(e);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username: user,
    };

    // console.log(newUser);
    try {
      const res = await axios.post("http://localhost:5000/users/add", newUser);
      // console.log(res.data);
    } catch (error) {
      console.error(error);
    }

    setUser("");
  };

  // console.log({ user });
  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={user}
            onChange={e=> onChangeUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
