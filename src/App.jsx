import React, { useEffect, useState }  from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Routes, Route, Link } from "react-router-dom";
import SignIn from './components/SignIn';


const theme = createTheme({
  palette: {
    primary: {
      main: '#263238',
    },
    secondary: {
      main: '#10B981',
    },
  },
});

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </ThemeProvider>
  ) 
}
