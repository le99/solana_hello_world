import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Recover from './auth/Recover';
import SubmitPage from './pages/SubmitPage';
import ValidatePage from './pages/ValidatePage';

import { RequireAuth, AuthProvider } from './auth/Auth';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import './index.css';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={darkTheme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<SignIn />} />        
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="recover" element={<Recover />} />
            {/* <Route path="home" element={
              <RequireAuth><App /></RequireAuth>
            } />
          </Routes> */}
            <Route path="home" element={
              <SubmitPage />
            } />
            <Route path="validate" element={
              <ValidatePage />
            } />
            <Route path="test" element={
              <App />
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
