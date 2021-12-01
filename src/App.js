import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Router } from "./components/Routes";
import { persistor, store } from "./store";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress } from "@mui/material";

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
        <PersistGate persistor={persistor} loading={<CircularProgress />}>
            <Router />
        </PersistGate>
      </ThemeProvider >
    </Provider>
  );
};