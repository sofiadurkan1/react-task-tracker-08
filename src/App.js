import React, { useEffect, useState } from 'react';
import './App.css';
import AddTask from './components/AddTask';
import Header from './components/Header';
import Tasks from './components/Tasks';
import axios from 'axios';

// const initialTasks =   {
//   id: 1,
//   text: 'Study React Pre-Class Notes',
//   day: 'Feb 5th at 2:30pm',
//   isDone: false,
// },
// {
//   id: 2,
//   text: 'Feed the Dog',
//   day: 'Feb 6th at 1:30pm',
//   isDone: false,
// },
// {
//   id: 3,
//   text: 'Attend in-Class',
//   day: 'Feb 7th at 20:00pm',
//   isDone: false,
// },

function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const baseUrl = 'http://localhost:5000/tasks';
  //CRUD
  //Fetch tasks
  // const fetchTasks = async () => {
  //   const res = await fetch(baseUrl);
  //   const data = await res.json();
  //   console.log(data);
  //   setTasks(data);
  // };

  //Fetch tasks with axios
  const fetchTasks = async () => {
    //const res = await axios.get(baseUrl);
    const { data } = await axios.get(baseUrl);
    console.log(data);
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  //Add Tasks
  // const addTask = async (task) => {
  //   const res = await fetch(baseUrl, {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify(task),
  //   });
  //   await res.json();
  //   fetchTasks();
  // };

  //Add Tasks with axios
  const addTask = async (task) => {
    const res = await axios.post(baseUrl, task);
    fetchTasks();
  };

  // const addTask = (task) => {
  //   const id = Math.floor(Math.random() * 10000) + 1;
  //   const newTask = { id, ...task };
  //   setTasks([...tasks, newTask]);
  // };

  //Delete tasks
  // const deleteTask = async (deleteTaskId) => {
  //   await fetch(`${baseUrl}/${deleteTaskId}`, {
  //     method: 'DELETE',
  //   });
  //   fetchTasks();
  // };

  //Delete with axios
  const deleteTask = async (deleteTaskId) => {
    await axios.delete(`${baseUrl}/${deleteTaskId}`);
    fetchTasks();
  };

  //Delete tasks
  // const deleteTask = (deleteTaskId) => {
  //   console.log('delete', deleteTaskId);
  //   setTasks(tasks.filter((task) => task.id !== deleteTaskId));
  // };

  //Toggle Done
  // const toggleDone = async (toggleDoneId) => {
  //   const res = await fetch(`${baseUrl}/${toggleDoneId}`);
  //   const task = await res.json();
  //   console.log(task);
  //   const updatedTask = { ...task, isDone: !task.isDone };

  //   await fetch(`${baseUrl}/${toggleDoneId}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify(updatedTask),
  //   });
  //   fetchTasks();
  // };

  //Toggle Done with axios
  const toggleDone = async (toggleDoneId) => {
    const { data } = await axios.get(`${baseUrl}/${toggleDoneId}`);
    console.log(data);
    const updatedTask = { ...data, isDone: !data.isDone };

    await axios.put(`${baseUrl}/${toggleDoneId}`, updatedTask);
    fetchTasks();
  };

  //Toggle Done
  // const toggleDone = (toggleDoneId) => {
  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === toggleDoneId ? { ...task, isDone: !task.isDone } : task
  //     )
  //   );
  // };

  //Toggle show and hide
  const toggleShow = () => setShowAddTask(!showAddTask);

  return (
    <div className="container">
      <Header
        title="Task Tracker"
        toggleShow={toggleShow}
        showAddTask={showAddTask}
      />
      {showAddTask && <AddTask addTask={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} deleteTask={deleteTask} toggleDone={toggleDone} />
      ) : (
        <p>"No Tasks to Show"</p>
      )}
    </div>
  );
}

export default App;
