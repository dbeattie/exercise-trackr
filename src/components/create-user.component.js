import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Heading,
  Input,
  FormControl,
  FormLabel,
  Container,
  Button,
} from "@chakra-ui/react"

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
    window.location = "/";
  };

  // console.log({ user });
  return (
    <Container maxW="1040px" mx="auto">
      <Heading>Create New User</Heading>
      <form onSubmit={onSubmit}>
        <div className="form-control">
        <FormControl id="user" isRequired>
            <FormLabel>Username:</FormLabel>
            <Input
              value={user}
              onChange={(e) => onChangeUsername(e.target.value)}
              placeholder="Username"
            />
          </FormControl>
          <br></br>
        <Button type="submit" colorScheme="teal" variant="outline" className="btn btn-primary">
            Create User
          </Button>
        </div>
      </form>
    </Container>
  );
}
