import { Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import ToDoList from "./pages/ToDoList";
import HomePage from './pages/HomePage';

import Button from '@mui/material/Button';
import BottomNavigation from '@mui/material/BottomNavigation';

import { createTheme, useTheme, ThemeProvider  } from '@mui/material/styles';
import { Typography } from '@mui/material';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        light: '#EEE9DA',
        main: '#93BFCF',
        dark: '#6096B4',
        contrastText: '#fff',
      },
      secondary: {
        light: '#9DC08B',
        main: '#609966',
        dark: '#40513B',
        contrastText: '#EDF1D6',
      },
    },
    typography: {
      fontFamily: [
        'Shadows+Into+Light',
        'cursive',
      ].join(','),
    }
  });

  return (
    <ThemeProvider theme={theme}>
    <Typography component="span">
    <div>
      <div>Twoja lista zakupów</div>
      {/* <ToDoList /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:listName" element={<ToDoList />} />
      </Routes>

      <BottomNavigation>
        <Button variant="containted" href="/">Strona Główna</Button>
      </BottomNavigation>
    </div>
    </Typography>
    </ThemeProvider>
  );
}

export default App;
