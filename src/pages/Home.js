import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import Login from './Login';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {ADMIN_USER} from '../Constants';

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const isAdmin = ADMIN_USER.includes(authUser.uid);
        if(isAdmin) {
          history.push('/dashboard');
        } else {
          history.push('/pdashboard');
        }
      } 
    }); 
    return ()=>{
      unsubscribe();
    }
}, []);

  function onLoginSuccess(authUser) {
    console.log('loginSUccesfull ==> ', authUser);
  }
  function onLoginError(error) {
    console.error('loginError ', error);
  }

  return (
    <> 
      <Container component="main" maxWidth="xs">
        <CssBaseline />
          <Login onSuccess={onLoginSuccess} onError={onLoginError} />
      </Container>
    </>
  )
};

export default Home;