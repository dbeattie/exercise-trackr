import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
// import Table from 'react-bootstrap/Table';

export default function Exercise({exercise, deleteExercise}) {
    console.log("Exercise:", exercise);
    console.log("Function:", deleteExercise);
    return (
        <tr>
            <td>{exercise.username}</td>
            <td>{exercise.description}</td>
            <td>{exercise.duration}</td>
            <td>{exercise.date.substring(0, 10)}</td>
            <td>
                <Link to={"/edit/" + exercise._id}>edit</Link> |{" "}
                <a href="#" onClick={() => deleteExercise(exercise._id)}>
                    delete
    </a>
            </td>
        </tr>

        // This is a responsive bootstrap code that we didn't add just yet...
        // because we're considering switching everything to Chakra.UI 
        // <Table responsive>
        //     <thead>
        //         <tr>
        //             <th>#</th>
        //             {Array.from({ length: 12 }).map((_, index) => (
        //                 <th key={index}>Table heading</th>
        //             ))}
        //         </tr>
        //     </thead>
        //     <tbody>
        //         <tr>
        //             <td>1</td>
        //             {Array.from({ length: 12 }).map((_, index) => (
        //                 <td key={index}>Table cell {index}</td>
        //             ))}
        //         </tr>
        //         <tr>
        //             <td>2</td>
        //             {Array.from({ length: 12 }).map((_, index) => (
        //                 <td key={index}>Table cell {index}</td>
        //             ))}
        //         </tr>
        //         <tr>
        //             <td>3</td>
        //             {Array.from({ length: 12 }).map((_, index) => (
        //                 <td key={index}>Table cell {index}</td>
        //             ))}
        //         </tr>
        //     </tbody>
        // </Table>
    );
};


