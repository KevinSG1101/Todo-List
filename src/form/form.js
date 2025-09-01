import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./form.css";


function Form(props) {
  const [newTask, setNewTask] = useState({});

  const formHandler = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };
  useEffect(()=>{
    setNewTask(props.editTaskData)

  },[props.editTaskData])

 
  return (
    <>
      <label>Title:</label>
      <input onChange={(e) => formHandler(e)} name="taskName" value={newTask.taskName}></input>
      <label>Description:</label>
      <input onChange={(e) => formHandler(e)} name="taskDescription" value={newTask.taskDescription}></input>
      <button onClick={() => props.addTask(newTask)}>Sumbit</button>
    </>
  );
}

export default Form;
