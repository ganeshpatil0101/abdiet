import React, { useContext, useEffect, useState } from "react";
import {isEmpty} from 'lodash';

import { Typography } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';
import Error from '@material-ui/icons/Error';
import CheckCircle from '@material-ui/icons/CheckCircle';
import DateFnsUtils from '@date-io/date-fns';
import getFirebase from '../firebase-config';
import { getFirestore, collection, getDoc, doc, getDocs } from 'firebase/firestore/lite';
import {getFormattedDate} from '../components/Handlers';


import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { green } from '@material-ui/core/colors';

import { useHistory } from 'react-router-dom';
import UserDataContext from '../hooks/UserData';
const app = getFirebase();
const db = getFirestore(app);

const StatusIcon = ({isComplete}) => {
  console.log(' isComplete ', isComplete);
  return (
    <>
      {
        (isComplete) ? 
          <CheckCircle style={{ color: green[500] }} /> : 
          <Error color="secondary" />
      }
    </>
  )
}



const UserItem = ({userData, sDate}) => {
  const history = useHistory();
  const [isComplete, setIsComplete] = useState(false);
  useEffect(() => {
    if(sDate) {
      const fDate = getFormattedDate(sDate);
      if(userData && userData.data[fDate]) {
        setIsComplete(true);
      } else {
        setIsComplete(false);
      }
    }
  }, [sDate]);
  
  const navigateTo = (id) => {
    history.push(`/assigndiet/${id}/${sDate.getTime()}`);
  }

  return (
    <>
    <ListItem button onClick={() => navigateTo(userData.uid)}>
        <ListItemAvatar>
          <Avatar>
            <Person />
          </Avatar>
        </ListItemAvatar>
        <ListItemText 
          primary={`${userData.pName}`} 
          secondary={`Age: ${userData.age}, Weight: ${userData.weight}, ${userData.vegNonveg} `} />
          <ListItemSecondaryAction>
            <StatusIcon isComplete={isComplete} />
          </ListItemSecondaryAction>
      </ListItem>   
    </>
  )
}

const Dashboard = () => {
  const userData = useContext(UserDataContext);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [userList, setUserList] = React.useState([]);
  
  useEffect(() => {
    if(!isEmpty(userData) && 
    !isEmpty(userData.currentUser) && !isEmpty(userData.currentUser.user)) {
      const userCollection = collection(db, "users");
      let list = [];
      getDocs(userCollection).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const uData = doc.data();
          list.push({...uData, uid: doc.id});
        });
        console.log('userlist ', list);
        setUserList(list);
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
          {/* <Typography style={{textAlign : "center"}} variant="h5" component="h5">Dashboard</Typography> */}
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
      </Container>
     </>
  );
};

export default Dashboard;