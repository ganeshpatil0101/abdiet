import React, { Suspense, lazy, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import UserDataContext from './hooks/UserData';
import getFirebase from './firebase-config';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {ADMIN_USER} from './Constants';
const Navbar = lazy(()=> import("./components/Navbar"));
const LoginHandler = lazy(()=> import("./pages/LoginHandler"));
const Dashboard = lazy(()=> import("./pages/Dashboard"));
const Home = lazy(() => import("./pages/Home"));
const AssignDiet = lazy(() => import("./pages/AssignDiet"));
const CreateUser = lazy(() => import("./pages/CreateUser"));
const DietMaster = lazy(() => import("./pages/DietMaster"));
const PatientDashboard = lazy(() => import("./pages/PatientDashboard"));

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}))

function App() {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = React.useState(null);
  const app = getFirebase();
  
  const onUserLoggedIn = (user) => {
    console.log('user here at app ', user);
  }
  const onSingOut = () => {
    setCurrentUser(null);
  }
  
  const auth = getAuth();
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          const isAdmin = ADMIN_USER.includes(authUser.uid);
          console.log('app ', authUser);
          setCurrentUser({user: authUser, isAdmin});
        } else {
          setCurrentUser(null);
        }
      });
      return ()=>{
        unsubscribe();
      }
  }, []);

  return (
    <Router>
      <UserDataContext.Provider value={{currentUser}} >
        <Suspense fallback={<div>Loading...</div>}>
        <Navbar onSingOut={onSingOut} />
        <div className={classes.offset}>
          {/* <header className="App-header"> */}
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/login" >
                <LoginHandler onUserLoggedIn={onUserLoggedIn} />
              </Route>
              <Route path="/dashboard" >
                <Dashboard />
              </Route>
              <Route path="/assigndiet/:uid/:date"> 
                <AssignDiet />
               </Route>
               <Route path="/createuser"> 
                <CreateUser />
               </Route>
               <Route path="/dietmaster"> 
                <DietMaster isAssign={false} />
               </Route>
               <Route path="/pdashboard" >
                <PatientDashboard />
               </Route>
            </Switch>
          {/* </header> */}
        </div>
        </Suspense>
      </UserDataContext.Provider>
    </Router>
  );
}
export default App;
