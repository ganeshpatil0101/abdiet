import React,{useEffect, useState} from 'react';
import {ListItem, ListItemSecondaryAction, ListItemText, ListItemAvatar} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';
import { green } from '@material-ui/core/colors';
import {Error, CheckCircle } from '@material-ui/icons';

import { useHistory } from 'react-router-dom';

import {getFormattedDate} from './Handlers';


const StatusIcon = React.memo(({isComplete}) => {
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
  });

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

  export default React.memo(UserItem);
