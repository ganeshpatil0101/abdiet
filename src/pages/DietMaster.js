import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';
import getFirebase from '../firebase-config';
import { getFirestore, collection,  setDoc, doc, getDocs } from 'firebase/firestore/lite';
import Error from '../components/Error';
import Loader from '../components/Loader';
import {getTimeInMs} from '../components/Handlers';
import { isEmpty } from 'lodash';
import DietMasterList from '../components/DietMasterList';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
const emptyDiet = {
  dName: '',
  meal1:'', 
  meal2:'', 
  meal3:'', 
  meal4:'', 
  meal5:'', 
  meal6:'',
  meal7:'',
  meal8:'',
};

const DietMaster = ({isAssign, onAssignDiet}) => {
  const classes = useStyles();
  const [dietData, setDietData] = useState({...emptyDiet});
  const [dietList, setDietList] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const app = getFirebase();
  const db = getFirestore(app);
  const userCollection = collection(db, "users");
  const dietMasterCollection = collection(db, "dietmaster");
  
  const resetFields = ()=>{ 
    setDietData({...emptyDiet})
  };

  const onInputChange = (key, value) => {
    const d = {...dietData};
    d[key] = value;
    setDietData(d);
  }
  const getDietList = () => {
    getDocs(dietMasterCollection).then((querySnapshot) => {
      let list = [];
      querySnapshot.forEach((doc) => {
        const dData = doc.data();
        list.push({...dData, id: doc.id});
      });
      console.log('dietList ', list);
      setDietList(list);
    });
  }

  useEffect(() => {
    if(isEmpty(dietList)) {
      getDietList();
    }
  }, []);

  function onSubmit(event) {
    event.preventDefault();
    if(isAssign) {
      onAssignDiet(dietData);
    } else {
      setIsLoading(true);
      let docRef = doc(dietMasterCollection);
      let alertMsg = 'Diet Saved Successfully';
      if(dietData.id) {
        docRef = doc(dietMasterCollection, dietData.id);
        alertMsg = 'Assigned diet successfully';
      } else {
        dietData['createdOn'] = getTimeInMs();
      }
      try{
        setDoc(docRef, dietData, { merge: true }).then(() => {
          alert(alertMsg);
          resetFields();
          setIsLoading(false);
          getDietList();
        }).catch((r)=> {
          console.error(r);
          setIsLoading(false);
        });
      } catch(e) {
        console.error('=====>', e);
        setIsLoading(false);
      }
    }
    return false;
  }
  const onEdit = (data) => {
    setDietData({...data});
    window.scrollTo({top:0,behavior:'smooth'})
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {isLoading && <Loader />}
      {!isLoading && <div className={classes.paper}>
        <Typography component="h1" variant="h5">
            { (isAssign) ? 'Assign Diet' : 'Diet Master' }
        </Typography>
        {error && <Error errorMessage={error} />}
        <form className={classes.form} method="post" onSubmit={onSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            autoFocus
            id="dietname"
            label="Diet Name"
            name="dName"
            value={dietData.dName}
            onChange={(event)=> onInputChange('dName', event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="6000"
            label="06:00"
            name="meal1"
            value={dietData.meal1}
            onChange={(event)=> onInputChange('meal1', event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="8000"
            label="08:00"
            name="meal1"
            value={dietData.meal2}
            onChange={(event)=> onInputChange('meal2', event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="1100"
            label="11:00"
            name="meal3"
            value={dietData.meal3}
            onChange={(event)=> onInputChange('meal3', event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="0100"
            label="01:00"
            name="meal4"
            value={dietData.meal4}
            onChange={(event)=> onInputChange('meal4', event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="0300"
            label="03:00"
            name="meal5"
            value={dietData.meal5}
            onChange={(event)=> onInputChange('meal5', event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="0530"
            label="05:30"
            name="meal6"
            value={dietData.meal6}
            onChange={(event)=> onInputChange('meal6', event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="0830"
            label="08:30"
            name="meal7"
            value={dietData.meal7}
            onChange={(event)=> onInputChange('meal7', event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="1000"
            label="10:00"
            name="meal8"
            value={dietData.meal8}
            onChange={(event)=> onInputChange('meal8', event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >{ (isAssign) ? 'Assign Diet' : 'Save Diet' }</Button>
        </form>
      </div>}
      <Divider />
      <DietMasterList list={dietList} onEdit={onEdit} isAssign={isAssign} />
    </Container>
  );
};

export default DietMaster;