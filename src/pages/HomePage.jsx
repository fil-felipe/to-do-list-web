import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';

function HomePage(props) {

    const { promiseInProgress } = usePromiseTracker();
    const [actualData, refreshData] = useState([]);

    const loadData = async () => {
        const userName = "default_user"
        await axios.get("https://to-do-list-app.filip-adamek.pl/user/"+userName)
        .then(response => {
          refreshData(response.data.avilable_lists);
        })
      }

    useEffect(() => {
        trackPromise(loadData());
        return () => {};
      }, []);

    return (
        <div>
            <h2>Witaj w aplikacji lista zakupów</h2>
            <h3>Oto twoje listy:</h3>
      <Card>
      <Box sx={{ 
        width: '100%', 
        maxWidth: 360,
        backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.light',
            opacity: [0.9, 0.8, 0.7],
          },
        }}>
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
      </Card>
        </div>
    );
}

export default HomePage;