import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Chat from './Chat';
import Welcome from '../welcome-component/Welcome';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const ChatWrapper = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const isSessionActive = localStorage.getItem('isSessionActive') === 'true';

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isSessionActive) {
      // Show the Snackbar for a short period before navigating
      const navigateTimer = setTimeout(() => {
        navigate("/");
      }, 2000); // Delay the navigation

      return () => clearTimeout(navigateTimer);
    }
  }, [isSessionActive, navigate]);

  if (!isSessionActive) {
    return (
      <>
        <Snackbar 
          open={open} 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="error" sx={{ fontSize: '1.5rem' }}>
            Please join an active session
          </Alert>
        </Snackbar>
        <Welcome/>
      </>
    );
  } else {
    return (
      <>
        <Snackbar 
          open={open} 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success" sx={{ fontSize: '1.5rem' }}>
            Connected to session
          </Alert>
        </Snackbar>
        <Chat/>
      </>
    )
  }
};

export default ChatWrapper;
