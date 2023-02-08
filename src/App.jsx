import React, { useState, useEffect } from 'react';
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import toDoList from "./database";

function App() {

  const [data, refreshData] = useState([]);
  
  useEffect( () => {
    axios.get("https://to-do-list-app.filip-adamek.pl/read-task").then((response) => {refreshData(response.data)})
  },[]);

  if (!data) return null;

  function handleSubmit(event) {
    const newTask = {
      task: event.target.elements.newTask.value,
      deleted: false
    }
    event.preventDefault();
    try {
      axios.post("https://to-do-list-app.filip-adamek.pl/add-task", newTask)
        .then(NotificationManager.success("Success message"))
        .then(axios.get("https://to-do-list-app.filip-adamek.pl/read-task").then((response) => {refreshData(response.data)}))
    } catch {
      NotificationManager.console.error("Ups something went wrong")
    }
  }

  function handleCLick(event, key) {
    event.preventDefault();
    try {
      axios.post("https://to-do-list-app.filip-adamek.pl/delete-task", {id: key})
        .then(axios.get("https://to-do-list-app.filip-adamek.pl/read-task").then((response) => {refreshData(response.data)}))
        .then(key? event.target.style.removeProperty('text-decoration'): event.target.style.setProperty('text-decoration', 'line-through'))
    } catch {
      NotificationManager.console.error("Ups something went wrong")
    }
  };

  return (
    <div>
      <h1>Twoja lista zakupów</h1>
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
          <input type="submit" value="Dodaj" />
      </form>
    </div>
  );
}

export default App;
