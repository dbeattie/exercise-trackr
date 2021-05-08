import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Heading,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
  Container,
  Button,
  Select
} from "@chakra-ui/react"
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
    setDuration(e)
  }

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
    <Container maxW="1040px" mx="auto">
      <Heading>Create New Exercise Log</Heading>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <Select
            isRequired
            size="md"
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
          </Select>
        </div>
        <div className="form-group">
          <FormControl id="desciption" isRequired>
            <FormLabel>Description:</FormLabel>
            <Input
              value={description}
              onChange={(e) => onChangeDescription(e.target.value)}
              placeholder="Description"
            />
          </FormControl>
        </div>
        <div className="form-group">
          <FormControl id="duration" isRequired>
            <FormLabel>Duration (in minutes):</FormLabel>
            <NumberInput
              size="md"
              maxW={24}
              type="number"
              focusInputOnChange="true"
              defaultvalue={10}
              value={duration}
              min={1}
              onChange={onChangeDuration}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </div>
        <div>
        </div>
        <div className="form-group">
          <FormControl id="date" isRequired>
            <FormLabel>Duration (in minutes):</FormLabel>
            <div>
                <DatePicker
                  size="md"
                  selected={date}
                  onChange={(date) => onChangeDate(date)}
                />
            </div>
          </FormControl>
        </div>
        <div className="form-group">
          <Button type="submit" colorScheme="teal" variant="outline" className="btn btn-primary">
            Create Exercise Log
          </Button>
        </div>
      </form>
    </Container>
  );
}
