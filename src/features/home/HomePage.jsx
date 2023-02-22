import React, {useState} from 'react';
import { Box, colors, Stack } from '@mui/material';
import Sidebar from 'src/features/home/components/Sidebar';
import Contents from 'src/features/home/components/Contents';
import {useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {useEffect,useRef,useContext } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertContext = React.createContext();
const HomePage = () => {
  const navigate = useNavigate()
  const [index, setIndex] = React.useState(0);
  const handleIndexTab = (index) => {
    setIndex(index);
  };
  const isLogin = useSelector( (state) => state.authen.isLogin)
  useEffect(()=>{
    if (!isLogin) {
      navigate('/authen/login');
    }
  },[isLogin])
  const homeRef = useRef();
  const [open, setOpen] = React.useState(false);

  const handleAlert = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  return (
      <AlertContext.Provider value={{ handleAlert }}>
      <Stack minWidth={1200} minHeight={710} height='100vh' ref={homeRef}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            This is a success message!
          </Alert>
        </Snackbar>
        <Stack height='100%'  direction="row">
          <Box height='100%' bgcolor={colors.grey[900]}  width={320}>
            <Sidebar handleIndexTab={handleIndexTab} />
          </Box>
          <Box height='100%' width="100%">
            <Contents index={index} />
          </Box>
        </Stack>
      </Stack>
      </AlertContext.Provider>

  );
};

export default HomePage;
