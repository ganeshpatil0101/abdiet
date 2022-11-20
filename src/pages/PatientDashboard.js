import React, {useEffect, useState, useRef, useContext} from "react";

import Divider from '@material-ui/core/Divider';
import { getFirestore, collection, getDoc, doc, getDocs } from 'firebase/firestore/lite';
import {get} from 'lodash'
import getFirebase from '../firebase-config';
import { Grid, Typography } from "@material-ui/core";
import UserDataContext from '../hooks/UserData';
import {isValidUser, getTodaysDate, getFormattedDate} from '../components/Handlers';
import MealItem from '../components/MealItem';
import Loader from '../components/Loader';

const app = getFirebase();
const db = getFirestore(app);

const PatientDashboard = () => {
  const userData = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [cData] = useState(getTodaysDate());
  const [dietData, setDietData] = useState({});
  const [basicData, setBasicData] = useState({});
  const dataRef = useRef(null);


  useEffect(()=>{
    if(isValidUser(userData)) {
      setIsLoading(true);
      getDoc(doc(db, "users", userData.currentUser.user.uid)).then((querySnapshot) => {
        dataRef.current = querySnapshot.data();
        setBasicData({
          pName: dataRef.current.pName,
          weight: dataRef.current.weight
        });
        const updatedData = dataRef.current.data[getFormattedDate(new Date())] || {};
        setDietData(updatedData);
        setIsLoading(false);
      }).catch((error) => {
        console.error('error', error);
        setIsLoading(false);
      });
    }
  }, [userData]);

  return (
    <div style={{padding : "10px"}} >
      
      {isLoading && <Loader />}
      {!isLoading && 
        <div>
          <div style={{textAlign : "center"}} >
            <Typography component="h6">
              {basicData.pName} - weight : {basicData.weight}
            </Typography>
            <br />
            <Typography variant="h5" component="h5">
              {cData}
            </Typography>
          </div>
          <Divider />
          <MealItem dietData={dietData} />
        </div>
      }
    </div>
  );
};

export default PatientDashboard;
