import React from "react";
import { Provider } from "react-redux";
import { Router } from "./components/Routes";
import { store } from "./store";
import { createTheme, ThemeProvider } from '@mui/material/styles';


export const App = () => {
  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#8484ee',
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <Router />
      </ThemeProvider>
    </Provider>
  );
};