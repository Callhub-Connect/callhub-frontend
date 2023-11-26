import React, { useState, useEffect } from 'react';
import Chat from './Chat';
import Welcome from '../welcome-component/Welcome';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const ChatWrapper = () => {
  const [open, setOpen] = useState(true);
  const isSessionActive = localStorage.getItem('isSessionActive') === 'true';

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isSessionActive) {
    return (
      <>
        <Snackbar 
          open={open} 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="error" sx={{ fontSize: '1.5rem', }}>
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
          <Alert severity="success" sx={{ fontSize: '1.5rem', }}>
            Connected to session
          </Alert>
        </Snackbar>
        <Chat/>
      </>
    )
  }
};

export default ChatWrapper;
