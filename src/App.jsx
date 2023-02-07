import React, { useState, useEffect } from 'react';
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import toDoList from "./database";

function App() {

  const [data, refreshData] = useState([]);
  
  useEffect( () => {
    axios.get("https://to-do-list-app-zsb4qeella-ew.a.run.app/read-task").then((response) => {refreshData(response.data)})
    // fetch("/read-task")
      // .then((res) => res.json())
      // .then((data) => refreshData(data.message));
    // console.log(data)
  },[]);

  if (!data) return null;

  function handleSubmit(event) {
    const newTask = {
      task: event.target.elements.newTask.value,
      deleted: false
    }
    event.preventDefault();
    try {
      axios.post("https://to-do-list-app-zsb4qeella-ew.a.run.app/add-task", newTask)
        .then(NotificationManager.success("Success message"))
        .then(axios.get("/read-task").then((response) => {refreshData(response.data)}))
    } catch {
      NotificationManager.console.error("Ups something went wrong")
    }
  }

  function handleCLick(event, key) {
    event.preventDefault();
    try {
      axios.post("https://to-do-list-app-zsb4qeella-ew.a.run.app/delete-task", {id: key})
        .then(axios.get("/read-task").then((response) => {refreshData(response.data)}))
        .then(key? event.target.style.removeProperty('text-decoration'): event.target.style.setProperty('text-decoration', 'line-through'))
    } catch {
      NotificationManager.console.error("Ups something went wrong")
    }
  };

  return (
    <div>
      <p>Test content</p>
      <ul>
        {data.map((element) => {
          return (
            <li 
              key={element.id} 
              onClick={event => handleCLick(event,element.id)} 
              style={{textDecoration: element.content.deleted? 'line-through': 'none' }}
            >
              {element.content.task}
            </li>
          )
        })}
      </ul>
      <form onSubmit={handleSubmit}>
          <input type="text" name="newTask" />
          <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
