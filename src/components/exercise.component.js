import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
// import Table from 'react-bootstrap/Table';
import { IconButton, Button } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

export default function Exercise({ exercise, deleteExercise }) {
    console.log("Exercise:", exercise);
    console.log("Function:", deleteExercise);
    return (
        <tr>
            <td>{exercise.username}</td>
            <td>{exercise.description}</td>
            <td>{exercise.duration}</td>
            <td>{exercise.date.substring(0, 10)}</td>
            <td>
                <Link to={"/edit/" + exercise._id}>
                    <IconButton
                        icon={<EditIcon />}
                        colorScheme="blue"
                        size="sm"
                        variant="outline"
                    />
                </Link> {" "}
                <IconButton 
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
                    variant="outline"
                    onClick={() => deleteExercise(exercise._id)}
                    />
            </td>
        </tr>
    );
};


