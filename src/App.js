import { useEffect, useState } from "react";
import "./App.css";
import Card from "./card/card";
import Form from "./form/form";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import Swal from 'sweetalert2';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [editTaskData, setEditTaskData] = useState({});

  const addTodo = () => {
    setIsFormOpen(true);
    console.log(taskData);
  };

const addTask = (newTask) => {
  if (editTaskData.taskName) {
    axios.post("http://127.0.0.1:5000/editTask", newTask).then((response) => {
      if (response.data.success === true) {
        Swal.fire("Updated!", "Task has been updated", "success");
        setIsFormOpen(false);
        getTasks();
        setEditTaskData({});
      }
    });
  } else {
    axios.post("http://127.0.0.1:5000/addTask", newTask).then((response) => {
      if (response.data.success === true) {
        Swal.fire("Added!", "New task added successfully", "success");
        setIsFormOpen(false);
        getTasks();
      }
    });
  }
};

  const editTodo = (taskData) => {
    setIsFormOpen(true);
    setEditTaskData(taskData);
    console.log(taskData);
  };

  const getTasks = () => {
    axios.get("http://127.0.0.1:5000/getTasks").then((response) => {
      setTaskData(response.data.tasks);
    });
  };

const deleteTodo = (id) => {
  axios.post("http://127.0.0.1:5000/deleteTask", { id: id }).then(() => {
    Swal.fire("Done!", "Task marked as done", "success");
    getTasks();
  });
};

  useEffect(() => {
    getTasks();
  }, []);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fefefe",
  border: "2px solid #ccc",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};


  return (
    <>
      <div>
        <button onClick={addTodo}>ADD TO DO LIST</button>
      </div>
      <div>
        {taskData.map((task) => {
          return (
            <Card
              task={task}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            ></Card>
          );
        })}
      </div>
      <div>
        <Modal
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={style}>
            <Form
              setIsFormOpen={setIsFormOpen}
              addTask={addTask}
              editTaskData={editTaskData}
            ></Form>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default App;
