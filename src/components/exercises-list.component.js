import React, { useState, useEffect } from "react";
import axios from "axios";
import Exercise from './exercise.component';
import { Table, Thead, Tbody, Tfoot, Tr, Th, TableCaption, Container, Text } from "@chakra-ui/react";

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
    <Container maxW="1040px" mx="auto">
      <Text fontSize="lg">
        <Table size="lg" variant="striped" colorScheme="teal">
          <TableCaption>List of Users and Exercises</TableCaption>
          <Thead className="thead-light">
            <Tr>
              <Th>Username</Th>
              <Th>Description</Th>
              <Th>Duration</Th>
              <Th>Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {exerciseList}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Username</Th>
              <Th>Description</Th>
              <Th>Duration</Th>
              <Th>Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Text>
    </Container>
  );
}
