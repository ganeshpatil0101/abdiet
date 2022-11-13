import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Login from './Login';
import Register from './Register';
import Loader from '../components/Loader';
import getFirebase from '../firebase-config';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AddMandal = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const app = getFirebase();
  useEffect(() => {
    const auth = getAuth();
      setIsLoading(true);
      onAuthStateChanged(auth, (authUser) => {
        setIsLoading(false);
        if (authUser) {
          setCurrentUser(authUser);
          setIsLogin(false);
        } else {
          setIsLogin(true);
          setCurrentUser(null);
        }
      });
  }, []);

  function onLoginSuccess() {
    console.log('loginSUccesfully');
    setIsLogin(false);
  }
  function onLoginError(error) {
    console.error('loginError ', error);
  }
  function onRegisterSuccess() {
    console.log('registerSUccesfully');
  }
  function onRegisterError(error) {
    console.error('registerError ', error);
  }
  return (
    <Grid container>
      {isLoading && <Loader/>}
      {isLogin && !isLoading && <Login onSuccess={onLoginSuccess} onError={onLoginError} />}
      {!isLogin && !isLoading && <Register currentUser={currentUser} onSuccess={onRegisterSuccess} onError={onRegisterError} />}
    </Grid>
  );
};

export default AddMandal;