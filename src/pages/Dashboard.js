import React, { useContext, useEffect, useState } from "react";


import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';


import DateFnsUtils from '@date-io/date-fns';
import getFirebase from '../firebase-config';
import { getFirestore, collection, getDoc, doc, getDocs } from 'firebase/firestore/lite';

import Loader from '../components/Loader';
import UserItem from '../components/UserItem';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


import UserDataContext from '../hooks/UserData';
import {isValidUser} from '../components/Handlers';

const app = getFirebase();
const db = getFirestore(app);

const Dashboard = () => {
  const userData = useContext(UserDataContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if(isValidUser(userData)) {
      setIsAdmin(userData.currentUser.isAdmin);
      const userCollection = collection(db, "users");
      let list = [];
      setIsLoading(true);
      getDocs(userCollection).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const uData = doc.data();
          list.push({...uData, uid: doc.id});
        });
        console.log('userlist ', list);
        setUserList(list);
        setIsLoading(false);
      }).catch((error) => {
        console.error('error', error);
        setIsLoading(false);
      });
    }
  }, [userData]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <> 
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        {!isAdmin && <h3>You don't have permission to this page</h3>}
        {isAdmin && 
          <div>
            {isLoading && <Loader />}
            {!isLoading && 
              <div>
                <div style={{textAlign : "center"}} >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Select Date To fill Diet"
                      minDate={new Date()}
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <List>
                  {userList.map((user) => (
                    <UserItem 
                      key={user.uid} 
                      sDate={selectedDate} 
                      userData={user} />))
                  }
              </List>
            </div>
            }
          </div>
        }
      </Container>
     </>
  );
};

export default Dashboard;