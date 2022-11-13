import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import DietMaster from './DietMaster';
import { getFormattedDate } from '../components/Handlers';
import { useHistory } from 'react-router-dom';
import getFirebase from '../firebase-config';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore/lite';

const AssignDiet = () => {
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
    existingData[fDate] = dietData;
    allUserData.data = existingData;
    // TODO Remove old date data of diet 
    try {
        setDoc(docRef, allUserData, { merge: true }).then(() => {
          alert('Saved !');
          history.push(`/dashboard`);
        }).catch((r)=> {
          console.error(r);
        });
      } catch(e) {
        console.error('=====>', e);
      }
  }

  return (
    <Grid container>
      <DietMaster isAssign={true} onAssignDiet={onAssignDiet} />
    </Grid>
  );
};

export default AssignDiet;
