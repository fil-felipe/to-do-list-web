import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import {NotificationContainer, NotificationManager} from 'react-notifications';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';

import Button from '@mui/material/Button';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function HomePage(props) {

    const { promiseInProgress } = usePromiseTracker();
    const [actualData, refreshData] = useState([]);
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [newList, setNewList] = useState("");

    const userName = "default_user"

    const loadData = async () => {
        await axios.get("https://to-do-list-app.filip-adamek.pl/user/"+userName)
        .then(response => {
          refreshData(response.data.avilable_lists);
        })
      }

    const newListPopup = () => {
      setOpen(!open);
    }

    function handleNewListSubmit(event) {
      event.preventDefault();
      const newListObject = {
        collection: event.target.elements.newTask.value
      }
      // axios.post("https://to-do-list-app.filip-adamek.pl/create-collection/"+userName, newListObject);

        // event.preventDefault();
        setNewList("");
        try {
          axios.post("https://to-do-list-app.filip-adamek.pl/create-collection/"+userName, newListObject)
            .then((response) => {
              refreshData(response.data.avilable_lists);
              // newListPopup();
            })
        } catch {
          NotificationManager.console.error("Ups something went wrong")
        }
      }

    useEffect(() => {
        trackPromise(loadData());
        return () => {};
      }, []);

    return (
        <div>
            <h1>Witaj w aplikacji lista zakupów</h1>
            <h2>Oto twoje listy:</h2>
      <Card>
      <Box display="flex"
  justifyContent="center"
  alignItems="center">
        <List>
          {promiseInProgress ? "loading" : actualData.map((element, index) => {
            return (
              <ListItem disablePadding key={index}>
                <ListItemButton>
                  <ListItemText primary={<NavLink to={"/" + element}>{element}</NavLink>} />
                </ListItemButton>
                <Divider />
              </ListItem>
            )
          })}
        </List>
      </Box>
      <Box   
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
      <Button variant="contained" className="button" onClick={() => setOpen(o => !o)}>
        Dodaj liste
      </Button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
        <form onSubmit={handleNewListSubmit}>
          <input type="text" name="newTask" value={newList} onChange={event => setNewList(event.target.value)} />
          <input type="submit" value="Dodaj" />
      </form>
        </div>
      </Popup>
      </Box>
      </Card>
      </div>
    );
}

export default HomePage;