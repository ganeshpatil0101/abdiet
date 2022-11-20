import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import DietMaster from './DietMaster';
import { getFormattedDate } from '../components/Handlers';
import { useHistory } from 'react-router-dom';
import getFirebase from '../firebase-config';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore/lite';
import Loader from '../components/Loader';
import { removeOldData } from '../components/Handlers';


const AssignDiet = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  let { uid, date } = useParams();
  const app = getFirebase();
  const db = getFirestore(app);
  const history = useHistory();
  
  const onAssignDiet = async (dietData) => {
    const fDate = getFormattedDate(new Date(Number(date)))
    console.log(dietData, uid, fDate);
    const userCollection = collection(db, "users");
    let docRef = doc(userCollection, uid);
    const docSnap = await getDoc(docRef);
    let allUserData = docSnap.data();
    let existingData = {...allUserData.data};
    const oldEntities = removeOldData(Object.keys(existingData));
    oldEntities.forEach((i) => {
      delete existingData[i];
    });
    existingData[fDate] = dietData;
    allUserData.data = existingData;
    try {
      setIsLoading(true);
        setDoc(docRef, allUserData).then(() => {
          alert('Assigned diet to user');
          setIsLoading(false);
          history.push(`/dashboard`);
        }).catch((r)=> {
          setIsLoading(false);
          console.error(r);
        });
      } catch(e) {
        console.error('=====>', e);
        setIsLoading(false);
      }
  }

  return (
    <Grid container>
      {isLoading && <Loader />}
      {!isLoading && 
        <DietMaster isAssign={true} onAssignDiet={onAssignDiet} />
      }
    </Grid>
  );
};

export default AssignDiet;
