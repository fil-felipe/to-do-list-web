import React, { useState, useEffect } from 'react';
import axios from "axios";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { useParams } from 'react-router-dom';

function ToDoList() {
  const appDomain = "https://to-do-list-app-zsb4qeella-ew.a.run.app"
  
  const { listName } = useParams();
  const [actualData, refreshData] = useState([]);
  const [actualDeleted, setDeleteStatus] = useState(false);
  const [newTask, setNewTask] = useState("");
  const { promiseInProgress } = usePromiseTracker();

  

  const loadData = async () => {
    await axios.get(appDomain+"/read-task/"+listName)
    .then(response => {
      refreshData(response.data);
    })
  }

  useEffect(() => {
    trackPromise(loadData());
    return () => {};
  }, []);

  function handleSubmit(event) {
    const newTask = {
      task: event.target.elements.newTask.value,
      deleted: false
    }
    event.preventDefault();
    setNewTask("");
    try {
      axios.post(appDomain+"/add-task/"+listName, newTask)
        .then((response) => {
          // console.log(Object.is(response.data, actualData))
          refreshData([...response.data]);
          // console.log(response.data);
        })
    } catch {
      NotificationManager.console.error("Ups something went wrong")
    }
  }

  function handleCLick(event, element) {
    event.preventDefault();
    try {
      axios.post(appDomain+"/delete-task/"+listName, {id: element.id})
        .then((response) => {
          refreshData(response.data);
          response.data.forEach(newElement =>{
            if (newElement.id === element.id) {
              setDeleteStatus(newElement.content.deleted)
              } 
            });
          // console.log(actualDeleted);
          actualDeleted? event.target.style.removeProperty('text-decoration',"none"): event.target.style.setProperty('text-decoration', 'line-through');
        })
    } catch {
      NotificationManager.console.error("Ups something went wrong")
    }
  };

  function deleteButton(event) {
    event.preventDefault();
    axios.delete(appDomain+"/delete-tasks/"+listName,{})
    .then((response) => {
      // console.log(response.data);
    //   refreshData(response.data);
    refreshData([...response.data]);
    });
  }

  return (
    <div>
      <h1>{listName}</h1>
      <ul>
        {promiseInProgress ? "loading" : actualData.map(element => {
          return (
            <li 
              key={element.id} 
              onClick={event => handleCLick(event,element)} 
              style={{textDecoration: element.content.deleted? 'line-through': 'none' }}
            >
              {element.content.task}
            </li>
          )
        })}
      </ul>
      <form onSubmit={handleSubmit}>
          <input type="text" name="newTask" value={newTask} onChange={event => setNewTask(event.target.value)} />
          <input type="submit" value="Dodaj" />
      </form>
      <button onClick={deleteButton}>Usuń przekreślone</button>
      <NotificationContainer />
    </div>
  );
}

export default ToDoList;
