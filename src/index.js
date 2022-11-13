import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import * as serviceWrokerRegistration from './serviceWorkerRegistration';
const theme = createTheme({
  typography: {
    fontFamily: 'Yatra One, cursive',
  },
});

ReactDOM.render(
  <React.StrictMode>
     <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWrokerRegistration.register();
reportWebVitals();
