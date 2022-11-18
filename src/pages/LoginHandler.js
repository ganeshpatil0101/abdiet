import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import Login from './Login';
import Register from './Register';
import Loader from '../components/Loader';
import getFirebase from '../firebase-config';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";

const LoginHandler = ({onUserLoggedIn}) => {
    // const [isLogin, setIsLogin] = React.useState(true);
    // const [isLoading, setIsLoading] = React.useState(false);
    // const history = useHistory();

    // const app = getFirebase();
    // useEffect(() => {
    //   const auth = getAuth();
    //     setIsLoading(true);
    //     onAuthStateChanged(auth, (authUser) => {
    //       setIsLoading(false);
    //       if (authUser) {
    //         onUserLoggedIn(authUser);
    //         setIsLogin(false);
    //         history.push('/dashboard');
    //       } else {
    //         setIsLogin(true);
    //       }
    //     });
    // }, []);
  
    function onLoginSuccess(authUser) {
      console.log('loginSUccesfully ==> ', authUser);
      // setIsLogin(false);
    }
    function onLoginError(error) {
      console.error('loginError ', error);
      // TODO show error 
    }

    return (
      <Grid container>
        {/* {isLogin && <Login onSuccess={onLoginSuccess} onError={onLoginError} />} */}

        <Login onSuccess={onLoginSuccess} onError={onLoginError} />
        {/* {!isLogin && !isLoading && <Register currentUser={currentUser} onSuccess={onRegisterSuccess} onError={onRegisterError} />} */}
      </Grid>
    );
};

export default LoginHandler;